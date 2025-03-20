//import required modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const trakt = require("./components/trakt/api");

//set up Express app
const app = express();
const port = process.env.PORT || 8080;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));

// PAGE ROUTES
app.get("/moive", async (request, response) => {
  let movies = await trakt.getTrendingMovies();
  console.log(movies);
  response.render("movie", { trendingMovies: movies });
});

app.get("/movie/:imdb/studios", async (request, response) => {
  console.log(request.params.imdb);
  let studios = await trakt.getStudiosByMovieId(request.params.imdb);
  response.render("studios", { studioList: studios });
});

app.get("/", async (request, response) => {
  let shows = await trakt.getAnticipatedShows();
  console.log(shows);
  response.render("index", { shows });
});
//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});


