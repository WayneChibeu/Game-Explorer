import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

const GameChart = ({ data }) => {
  return (
    <motion.div
      className="chart-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
    >
      <BarChart width={600} height={300} data={data.trends}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="game" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="popularity" fill="#8884d8" />
      </BarChart>
    </motion.div>
  );
};

export default GameChart;
