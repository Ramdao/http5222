const { MongoClient, ObjectId } = require("mongodb");

//CONNECT TO THE DB
const dbUrl = process.env.MONGOURI;
const client = new MongoClient(dbUrl); //client for DB queries

//MONGODB FUNCTIONS
async function connection() {
  let db = client.db("testdb"); //you can leave the parentheses empty if you specified a default DB in the connection string
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

module.exports = {
  getLinks,
  addLink,
  deleteLink
};