import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import games from './components/api.js';

// Configure environment
dotenv.config();

// ES modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Route to serve the main page with game search
app.get('/', async (req, res) => {
    try {
        let searchQuery = req.query.search || '';
        let gameData = await games.searchGames(searchQuery);
        res.render('index', { 
            games: gameData.results || [], 
            searchQuery,
            showGameSearch: true // Flag to show game search section
        });
    } catch (error) {
        console.error("Error fetching games:", error);
        res.status(500).send("Error fetching games");
    }
});

// Route for top-rated games
app.get('/details', async (req, res) => {
    try {
        let gameData = await games.topGames();
        let topRatedGames = gameData.filter(game => game.rating)
                                   .sort((a, b) => b.rating - a.rating)
                                   .slice(0, 10);

        if (topRatedGames.length === 0) {
            throw new Error("No games with ratings found.");
        }

        res.render('details', { 
            games: topRatedGames,
            showTopGames: true // Flag to show top games section
        });
    } catch (error) {
        console.error("Error fetching top-rated games:", error.message);
        res.status(500).send(`Error fetching top-rated games: ${error.message}`);
    }
});

// API route for mood-based game suggestions
app.post('/suggest-games', async (req, res) => {
    const { mood } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: 'user',
                    content: `Suggest 5 video games that would be good to play when feeling ${mood}. 
                    For each game, include: 
                    - Title
                    - Genre
                    - Brief reason why it suits this mood
                    - Platform availability
                    
                    Format the response as follows:
                    [Mood]: ${mood}
                    
                    1. [Game Title]
                    - Genre: [Genre]
                    - Why Play: [Reason]
                    - Platforms: [Platforms]
                    
                    2. [Game Title]... etc.`
                }
            ],
            max_tokens: 1000
        });

        res.json({ suggestions: response.choices[0].message.content });
    } catch (error) {
        console.error("Error generating game suggestions:", error);
        res.status(500).json({ error: "Failed to fetch game suggestions." });
    }
});

// Serve client-side JavaScript
app.get('/script.js', (req, res) => {
    res.type('application/javascript').send(`
        document.addEventListener('DOMContentLoaded', () => {
            // Mood-based game suggestion functionality
            const moodSearchButton = document.getElementById('moodSearchButton');
            const moodSearchInput = document.getElementById('moodSearchInput');
            const moodResultsElement = document.getElementById('moodResults');
            
            // Game search functionality
            const gameSearchForm = document.getElementById('gameSearchForm');
            const gameSearchInput = document.getElementById('gameSearchInput');

            async function getGameSuggestions(mood) {
                try {
                    const response = await fetch('/suggest-games', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ mood }),
                    });

                    const data = await response.json();
                    return data.suggestions || "No suggestions found.";
                } catch (error) {
                    console.error("Error fetching suggestions:", error);
                    return "Failed to fetch suggestions.";
                }
            }

            function displayMoodSuggestions(mood, suggestionsText) {
                const games = suggestionsText.split(/\\d+\\./).slice(1);
                
                let html = \`<h2>Games for when you're feeling \${mood.toLowerCase()}</h2>\`;
                
                games.forEach(game => {
                    const titleMatch = game.match(/^\\s*([^\\n]+)/);
                    const genreMatch = game.match(/Genre:\\s*([^\\n]+)/i);
                    const whyMatch = game.match(/Why Play:\\s*([^\\n]+)/i);
                    const platformsMatch = game.match(/Platforms:\\s*([^\\n]+)/i);
                    
                    const title = titleMatch ? titleMatch[1].trim() : 'Unknown Game';
                    const genre = genreMatch ? genreMatch[1].trim() : 'Various genres';
                    const why = whyMatch ? whyMatch[1].trim() : 'Great for this mood!';
                    const platforms = platformsMatch ? platformsMatch[1].trim() : 'Multiple platforms';
                    
                    html += \`
                        <div class="game-card">
                            <h3>\${title}</h3>
                            <p><strong>Genre:</strong> \${genre}</p>
                            <p><strong>Why Play:</strong> \${why}</p>
                            <p><strong>Platforms:</strong> \${platforms}</p>
                        </div>
                    \`;
                });
                
                moodResultsElement.innerHTML = html;
            }

            async function handleMoodSearch() {
                const mood = moodSearchInput.value.trim();

                if (!mood) {
                    moodResultsElement.innerHTML = "<p>Please enter your current mood.</p>";
                    return;
                }

                moodResultsElement.innerHTML = "<p>Finding perfect games for you...</p>";
                const suggestions = await getGameSuggestions(mood);
                displayMoodSuggestions(mood, suggestions);
            }

            // Handle game search form submission
            if (gameSearchForm) {
                gameSearchForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const searchTerm = gameSearchInput.value.trim();
                    window.location.href = \`/?search=\${encodeURIComponent(searchTerm)}\`;
                });
            }

            // Set up event listeners
            if (moodSearchButton) {
                moodSearchButton.addEventListener("click", handleMoodSearch);
            }
            if (moodSearchInput) {
                moodSearchInput.addEventListener("keypress", (e) => {
                    if (e.key === 'Enter') handleMoodSearch();
                });
            }
        });
    `);
});



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

