// Required settings for this project
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

// Load database functions and models
const db = require("./modules/db");
const { getGames, getPlayers, addGame, addPlayer } = db;

const app = express();
const port = process.env.PORT || "8888";

// Middleware
app.use(express.json()); // Parses JSON data in requests
app.use(express.urlencoded({ extended: true })); // Parses form data

// Set up application template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

// Route to the homepage
app.get("/", (req, res) => {
  res.redirect("/index"); // Redirect to /index page for now
});

// Admin Page (Render Games and Players in Pug)
app.get("/index", async (req, res) => {
  try {
    const games = await getGames();
    const players = await getPlayers(); // Fetch players as well
    res.render("index", { games, players }); // Pass both games and players to the view
  } catch (error) {
    res.status(500).send("Error fetching data.");
  }
});

// API Endpoint: Get all games (JSON response)
app.get("/api/games", async (req, res) => {
  try {
    const games = await getGames();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

// API Endpoint: Add a game
app.post("/api/games", async (req, res) => {
  try {
    const { title, platform, release_date, genre, rating } = req.body;
    await addGame(title, platform, release_date, genre, rating);
    res.redirect("/index"); // Redirect to admin page after adding a game
  } catch (error) {
    res.status(500).json({ error: "Failed to add game" });
  }
});

// API Endpoint: Get all players (JSON response)
app.get("/api/players", async (req, res) => {
  try {
    const players = await getPlayers();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

// API Endpoint: Add a player
app.post("/api/players", async (req, res) => {
  try {
    const { username, favorite_games, hours_played } = req.body;
    
    // Split the comma-separated list of favorite games and trim any extra spaces
    const favoriteGamesArray = favorite_games.split(",").map(game => game.trim());
    
    // Add the player to the database
    await addPlayer(username, favoriteGamesArray, hours_played);
    
    res.redirect("/index"); // Redirect back to the admin page after adding a player
  } catch (error) {
    res.status(500).json({ error: "Failed to add player" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
