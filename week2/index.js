//Import
const express = require("express");
const path = require("path"); // helps with paths

// Set up express app
const app = express();
const port = process.env.PORT || "5000";

//set up express to use folder for view (templates)

app.set("views", path.join(__dirname, "views"/*folder name*/)); // set the path 
app.set("view engine", "pug"); //set pug as the express apps template engine

// public folders for static files
app.use(express.static(path.join(__dirname,"public")));

// Test

app.get("/",(request, response)=>{
    //response.status(200).send("Test");
    response.render("index", {name:"Electro"});
});
app.get("/about",(request,response)=>{

    response.render("about",{title: "About"});
})

// Set server to listening

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
})