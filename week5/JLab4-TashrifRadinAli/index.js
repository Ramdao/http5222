const express = require("express");
const path = require("path"); //needed when setting up static/file paths
const dotenv = require("dotenv");

//load the environment variables from .env
dotenv.config();

const db = require("./modules/db"); //load db.js

//set up the Express app
const app = express();
const port = process.env.PORT || "8888";

//set up application template engine
app.set("views", path.join(__dirname, "views")); //the first "views" is the setting name
//the second value above is the path: __dirname/views
app.set("view engine", "pug");

//set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

//USE PAGE ROUTES FROM ROUTER(S)
app.get("/", async (req, res) => {
  let movieList = await db.getMovies(); 
  if (!movieList.length) {
    await db.initializeMovies();
    movieList = await db.getMovies();
  }
  res.render("index", { movies: movieList });
});

app.get("/add", async (request, response) => {
  //add a movie
  await db.addMovie("Gravity","2013","R")
  response.redirect("/");
});
app.get("/update", async (req, res) => {
  await db.updateMovieRating("Inception", "PG");
  res.redirect("/");
});

app.get("/delete", async (req, res) => {
  await db.deleteMoviesByRating("R");
  res.redirect("/");
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
}); 

