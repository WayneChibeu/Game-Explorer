import { useEffect, useState } from "react";
import { fetchData } from "./api/api";
import GameChart from "./components/GameChart";
import Footer from "./components/footer";
import { motion } from "framer-motion";
import './App.css';

function App() {
  const [data, setData] = useState({ trends: [] }); // State for game data
  const [filter, setFilter] = useState(""); // State for filter input

  useEffect(() => {
    fetchData().then((res) => {
      console.log("Fetched data:", res); // Debugging line
      if (res && res.trends) {
        const formattedData = res.trends.map((item) => ({
          game: item.nameOfTheGameProperty, // Matches the RAWG API response
          popularity: item.valueOfThePopularityProperty, // Matches the RAWG API response
        }));
        setData({ trends: formattedData });
      } else {
        setData({ trends: [{ game: "No Data", popularity: 0 }] });
      }
    });
  }, []);

  const filteredData = data.trends.filter((item) =>
    item.game?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Game Trends 🎮🔥
      </motion.h1>

      <input
        type="text"
        placeholder="Filter games..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          padding: "10px",
          margin: "20px 0",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {filteredData.length > 0 ? (
        <motion.div
          className="chart-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <GameChart data={filteredData} />
        </motion.div>
      ) : (
        <p>No games found.</p>
      )}

      <Footer />
    </div>
  );
}

export default App;