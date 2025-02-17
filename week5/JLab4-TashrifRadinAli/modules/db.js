const mongoose = require("mongoose");

//const dbUrl = `mongodb://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/?authSource=testdb`;
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

//set up Schema and model
const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: String,
});
const Movie = mongoose.model("Movie", MovieSchema);
//MONGODB FUNCTIONS
async function connect() {
  await mongoose.connect(dbUrl); //connect to mongodb
}

//Get all pets from the pets collection
async function getMovies() {
  await connect();
  return await Movie.find({}); //return array for find all
}

async function initializeMovies(){
  let movielist = [
    {
      title: "Inception", 
      year: 2010, 
      rating: "PG-13"

    },
    {
      title: "Pacific Rim", 
      year: 2013, 
      rating: "G"

    }
    
  ];
  await Movie.insertMany(movielist)
}

async function addMovie(movieName, movieYear, movieRating) {

  let newmovie = new Movie ({
    title: movieName,
    year: movieYear,
    rating: movieRating,
    
  })
  await newmovie.save();
}

async function updateMovieRating(title, newRating) {
  await connect();
  await Movie.updateOne({ title: title }, { rating: newRating });
}

async function deleteMoviesByRating(rating) {
  await connect();
  await Movie.deleteMany({ rating: rating });
}

module.exports = {
  initializeMovies,
  getMovies,
  addMovie,
  updateMovieRating,
  deleteMoviesByRating

}