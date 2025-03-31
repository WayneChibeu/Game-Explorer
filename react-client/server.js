const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const PORT = 5000;

const RAWG_API_URL = "https://api.rawg.io/api/games";
const API_KEY = "d6676ad8c1c0437891e5bc7fe95cdda9"; // Replace with your RAWG API key

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // Serve the HTML file
});

app.get("/api/games", async (req, res) => {
  try {
    const { page = 1, search = "" } = req.query; // Get page and search query from the request
    const response = await axios.get(RAWG_API_URL, {
      params: {
        key: API_KEY,
        ordering: "-rating",
        page_size: 12, 
        page,
        search, // Include the search query in the API request
      },
    });

    const filteredResults = response.data.results.map((game) => ({
      id: game.id,
      name: game.name,
      released: game.released,
      rating: game.rating,
      background_image: game.background_image,
      genres: game.genres || [], // Ensure genres is an array
      platforms: game.platforms || [], // Ensure platforms is an array
    }));

    res.json(filteredResults);
  } catch (error) {
    console.error("Error fetching data from RAWG API:", error.message);
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});