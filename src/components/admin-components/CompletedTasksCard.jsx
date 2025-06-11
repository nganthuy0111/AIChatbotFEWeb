import React, { useEffect, useRef } from "react";
import { Paper, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const CompletedTasksCard = () => {
  const chartRef = useRef(null);

  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Sales",
        data: [40, 20, 30, 50, 25, 60, 45],
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Last Campaign Performance" },
    },
  };

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <Paper
      sx={{
        p: 2,
        textAlign: "center",
        backgroundColor: "#fffde7",
        color: "#ffeb3b",
      }}
    >
      <Typography variant="h6">Completed Tasks</Typography>
      <Typography variant="h4">Last Campaign Performance</Typography>
      <Typography variant="body2" color="text.secondary">
        Campaign sent 2 days ago
      </Typography>
      <Line data={lineChartData} options={lineChartOptions} ref={chartRef} />
    </Paper>
  );
};

export default CompletedTasksCard;
