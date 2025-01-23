//IMPORT REQUIRED MODULES
const express = require("express");
const path = require("path"); //this modules contains methods that we can use for path concatenation
const { MongoClient, ObjectId } = require("mongodb");

//CONNECT TO THE DB
const dbUrl = "mongodb://127.0.0.1:27017/testdb"; 
const client = new MongoClient(dbUrl); //client for DB queries

//SET UP EXPRESS APP
const app = express();
const port = process.env.PORT || "8888";

//SET UP EXPRESS TO USE "templates" FOLDER FOR VIEWS
app.set("views", path.join(__dirname, "templates")); //set the path to the /templates folder for views
app.set("view engine", "pug"); //set Pug as the Express app's template engine

//SET UP EXPRESS TO USE THE "public" FOLDER FOR STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

/* 
  Typically, forms send data in the urlencoded format (weight=0&path=/&name=Home). The following two lines of code will extend the allowed types to use JSON, so that we can now receive the form data as the following: { weight: 0, path: "/", name: "Home" }
*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//TEST APP
//Home page route
app.get("/", async (request, response) => {
  let links = await getLinks();
  response.render("index", { title: "Home", menu: links });
});
//About page route
app.get("/about", async (request, response) => {
  let links = await getLinks();
  response.render("about", { title: "About", menu: links });
})
//ADMIN PAGE ROUTES
/*
  /admin/menu (Main admin page for all menu links)
  - /admin/menu/add (Page with form to add new link)
*/
app.get("/admin/menu", async (request, response) => {
  let links = await getLinks();
  response.render("menu-list", { title: "Administer menu", menu: links });
});
app.get("/admin/menu/add", async (request, response) => {
  let links = await getLinks();
  response.render("menu-add", { title: "Add menu link", menu: links });
});
app.post("/admin/menu/add/submit", async (request, response) => {
  //For POST forms, data is sent via request.body
  //For GET forms, data is sent via request.query
  console.log(request.body.path);
  let newLink = {
    weight: request.body.weight,
    path: request.body.path,
    name: request.body.name
  };
  await addLink(newLink);
  response.redirect("/admin/menu"); //redirect back to the main menu admin page
});
app.get("/admin/menu/delete", async (request, response) => {
  await deleteLink(request.query.linkId);
  response.redirect("/admin/menu");
})

// GET route to /admin/menu/edit 
app.get("/admin/menu/edit", async (request, response) => {
  if (request.query.linkId) {
  let linkToEdit = await getSingleLink(request.query.linkId);
  let links = await getLinks();
  response.render("menu-edit", { title: "Edit menu link", menu: links,
  editLink: linkToEdit });
  } else {
  response.redirect("/admin/menu");
  }
  });

// POST route with new edited data
app.post("/admin/menu/edit/submit", async (request,response) =>{

  let idFilter= {_id: new ObjectId(request.body.linkId)};

  let link ={
    weight: parseInt(request.body.weight),
    path: request.body.path,
    name: request.body.name
  }
  
  await editLink(idFilter,link);
  response.redirect("/admin/menu");

});

//SET SERVER TO LISTENING
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})

//MONGODB FUNCTIONS
async function connection() {
  let db = client.db(); //you can leave the parentheses empty if you specified a default DB in the connection string
  return db;
}

//Select and return an array of all documents in the menuLinks collection.
async function getLinks() {
  let db = await connection(); //select the DB
  let results = db.collection("menuLinks").find({}); // {} is the query. When it's empty, this means there's no filter, so find({}) is equivalent to a SELECT all
  let resultArray = await results.toArray();
  return resultArray;
}

//Use insertOne to insert a new document (link) into the menuLinks collection.
async function addLink(link) {
  let db = await connection(); //retrieve the db
  let result = await db.collection("menuLinks").insertOne(link);
  console.log("link added");
}

//Use deleteOne to delete a document from the menuLinks collection by id.
async function deleteLink(id) {
  let query = { _id: new ObjectId(id) };
  let db = await connection();
  let result = await db.collection("menuLinks").deleteOne(query);
  console.log("deleted successfully");
}

// Retrieve a singel document from menuLinks by _id
async function getSingleLink(id){
  let db = await connection();
  const editId = {_id: new ObjectId(id)};
  const result = await db.collection("menuLinks").findOne(editId);
  return result;
}

async function editLink(filter, link) {
  let db = await connection();
  const update = { $set: link };      
  const result = await db.collection("menuLinks").updateOne(filter, update);
  return result;
 
}

