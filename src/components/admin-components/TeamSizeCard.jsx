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

const TeamSizeCard = () => {
  const chartRef = useRef(null);

  const lineChartData = {
    labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    datasets: [
      {
        label: "Doanh số hàng ngày",
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
      title: { display: true, text: "Doanh số hàng ngày" },
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
        backgroundColor: "#fff3e0",
        color: "#ff9800",
        width: "300px",
        height: "auto",
      }}
    >
      <Typography variant="h6">Kích thước nhóm</Typography>
      <Typography variant="h4">401/500GB</Typography>
      <Typography variant="body2" color="text.secondary">
        Lấy thêm dung lượng
      </Typography>
      <Line data={lineChartData} options={lineChartOptions} ref={chartRef} />
    </Paper>
  );
};

export default TeamSizeCard;
