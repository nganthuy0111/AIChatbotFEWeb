import React, { useEffect, useRef } from "react";
import { Paper, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueCard = () => {
  const chartRef = useRef(null);

  const barChartData = {
    labels: ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6"],
    datasets: [
      {
        label: "Đăng ký Email",
        data: [400, 500, 300, 600, 200, 700],
        backgroundColor: "#ff9800",
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Đăng ký Email" },
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
        backgroundColor: "#e8f5e9",
        color: "#4caf50",
        height: "auto",
        width: "75%",
      }}
    >
      <Typography variant="h6">Revenue</Typography>
      <Typography variant="h4">$12,500</Typography>
      <Typography variant="body2" color="text.secondary">
        This month
      </Typography>
      <Bar data={barChartData} options={barChartOptions} ref={chartRef} />
    </Paper>
  );
};

export default RevenueCard;
