import axios from "axios";

const RAWG_API_URL = "http://localhost:5000/api/games";
const API_KEY = "d6676ad8c1c0437891e5bc7fe95cdda9"; // Replace with your RAWG API key

export const fetchData = async () => {
  try {
    const response = await axios.get(RAWG_API_URL, {
      params: {
        key: API_KEY,
        ordering: "-rating", // Order by highest rating
        page_size: 12, // Limit to 12 games
      },
    });

    // Map the RAWG API response to match your app's data structure
    return {
      trends: response.data.results.map((game) => ({
        nameOfTheGameProperty: game.name, // Game name
        valueOfThePopularityProperty: game.rating, // Game rating
      })),
    };
  } catch (error) {
    console.error("Error fetching data from RAWG API:", error);
    return { trends: [] }; // Return an empty array on error
  }
};

