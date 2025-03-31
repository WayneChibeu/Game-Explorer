const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Test API Route
app.get("/api/data", (req, res) => {
  res.json({
    message: "Hello, Wayne! 🚀 Your API is working!",
    trends: [
      { game: "Elden Ring", popularity: 95 },
      { game: "Cyberpunk 2077", popularity: 80 },
      { game: "GTA VI (Upcoming)", popularity: 100 },
    ],
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
