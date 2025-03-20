const trakt = "https://api.trakt.tv"; //base URL for any Trakt API requests

/*
 * Functions for Trakt API requests.
 */

//Function to retrieve a list of trending movies.
async function getTrendingMovies() {
  let reqUrl = `${trakt}/movies/trending?extended=full`;
  /* 
  HEADERS REQUIRED:
  Content-Type:application/json
  trakt-api-version:2
  trakt-api-key:[client_id] */
  let response = await fetch(
    reqUrl,
    {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": process.env.TRAKT_CLIENT_ID
      }
    }
  );
  return await response.json();
}

//Function to retrieve a list of Anticipated Shows.
async function getAnticipatedShows() {
  let reqUrl = `${trakt}/shows/anticipated?extended=full?page=1&limit=15`;

  let response = await fetch(
    reqUrl,
    {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": process.env.TRAKT_CLIENT_ID
      }
    }
  );
  return await response.json();
}

//Function to retrieve a list of studios by IMDB movie ID
async function getStudiosByMovieId(imdbId) {
  let reqUrl = `${trakt}/movies/${imdbId}/studios`;
  let response = await fetch(
    reqUrl,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": process.env.TRAKT_CLIENT_ID
      }
    }
  );
  return await response.json();
}



module.exports = {
  getTrendingMovies,
  getStudiosByMovieId,
  getAnticipatedShows
};