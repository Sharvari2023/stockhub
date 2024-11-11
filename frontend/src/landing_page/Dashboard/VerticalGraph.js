import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; 
import { Doughnut } from "react-chartjs-2"; // Import Doughnut instead of Pie

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Holdings",
    },
  },
};

export function DoughnutChart({ data }) {
  // Define color palette from #96e856 to black
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

  // Create a new data object with custom background colors
  const chartData = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: palette.slice(0, data.labels.length), // Limit palette to data points
    })),
  };

  return <Doughnut options={options} data={chartData} />; // Use Doughnut component
}

// Example usage
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
      <DoughnutChart data={exampleData} /> {/* Use DoughnutChart instead of PieChart */}
    </div>
  );
}

export default App;  