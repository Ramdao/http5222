const mongoose = require("mongoose");
dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// MongoDB Connection String
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

// Connect to MongoDB
mongoose.connect(dbUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(" MongoDB Connection Error:", err));

// Game Schema
const GameSchema = new mongoose.Schema({
  title: String,
  platform: String,
  release_date: Date,
  genre: String,
  rating: Number
});
const Game = mongoose.model("Game", GameSchema);

// Player Schema
const PlayerSchema = new mongoose.Schema({
  username: String,
  favorite_games: [String],
  hours_played: Number
});
const Player = mongoose.model("Player", PlayerSchema);

//  Add a Game
async function addGame(title, platform, release_date, genre, rating) {
  let newGame = new Game({ title, platform, release_date, genre, rating });
  await newGame.save();
}

// Add a Player
async function addPlayer(username, favorite_games, hours_played) {
  let newPlayer = new Player({ username, favorite_games, hours_played });
  await newPlayer.save();
}

//  Get All Games
async function getGames() {
  return await Game.find({});
}

// Get All Players
async function getPlayers() {
  return await Player.find({});
}

// Export Functions
module.exports = {
  getGames,
  getPlayers,
  addGame,
  addPlayer
};
