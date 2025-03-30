


async function topGames() {
    let reqUrl = 'https://api.rawg.io/api/games?key=d45ff65c85c84827a67ebe4eca53df87&ordering=-rating&page_size=10';
  
    let response = await fetch(reqUrl, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  
    let data = await response.json();
    console.log("API Response:", data); // Log the API response
  
    return data.results || [];
  }



  async function searchGames(searchTerm = "") {
    let reqUrl = 'https://api.rawg.io/api/games?key=d45ff65c85c84827a67ebe4eca53df87';
  
    // If a search term is provided, modify the URL
    if (searchTerm) {
      reqUrl += `&search=${encodeURIComponent(searchTerm)}`;
    }
  
    let response = await fetch(reqUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    return await response.json();
  }
  
  
  


  module.exports = {
    topGames,
    searchGames,
  };

