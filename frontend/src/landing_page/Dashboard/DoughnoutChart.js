import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// Shadow plugin for 3D effect
const shadowPlugin = {
  id: "shadowPlugin",
  beforeDraw: (chart) => {
    const ctx = chart.ctx;
    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex); // Safely get metadata
      meta.data.forEach((element) => {
        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        element.draw(ctx); // Draw with shadow
        ctx.restore();
      });
    });
  },
};

ChartJS.register(shadowPlugin);

export function DoughnutChart({ data }) {
  // Define color gradient from green (#96e856) to black
  const palette = [
    "#96e856", // Light green
    "#80cc4c", // Slightly darker green
    "#6ab142",
    "#549637",
    "#3e7b2d",
    "#285023",
    "#1c3a1b",
    "#111f12",
    "#000000", // Black
  ];

  // Create new data object with custom background colors
  const chartData = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: palette,
    })),
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    cutout: "50%", // Adjust for a more 3D look
  };

  return <Doughnut data={chartData} options={options} />;
}

// Example usage with data
const exampleData = {
  labels: ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6", "Category 7", "Category 8", "Category 9"],
  datasets: [
    {
      label: "My Dataset",
      data: [10, 20, 30, 40, 50, 60, 70, 80, 90],
    },
  ],
};

// Render in your main component or App
export function App() {
  return (
    <div style={{ width: '400px', margin: 'auto' }}>
      <h2>Category Distribution</h2>
      <DoughnutChart data={exampleData} />
    </div>
  );
}

export default App;
