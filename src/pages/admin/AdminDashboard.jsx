import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Tab,
  Tabs,
  Card,
  CardContent,
  Button,
  IconButton,
  Avatar,
  LinearProgress,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import SidebarAdmin from "../../components/admin-components/SideBarAdmin";
import HeaderAdmin from "../../components/admin-components/HeaderAdmin";
import UserManagement from "./UserManagement";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedSection, setSelectedSection] = useState("dashboard");

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  // Line Chart data
  const lineChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [30, 40, 35, 50, 45, 60, 55, 65, 70, 60, 75, 80],
        borderColor: "#4A90E2",
        backgroundColor: "rgba(74, 144, 226, 0.1)",
        fill: true,
      },
      {
        label: "Cost",
        data: [20, 25, 30, 35, 25, 40, 35, 45, 50, 40, 55, 60],
        borderColor: "#82ca9d",
        backgroundColor: "rgba(130, 202, 157, 0.1)",
        fill: true,
      },
    ],
  };

  // Pie Chart data
  const pieChartData = {
    labels: ["Direct", "Social Media", "Email", "Other"],
    datasets: [
      {
        data: [35, 30, 20, 15],
        backgroundColor: [
          "rgba(74, 144, 226, 0.8)",
          "rgba(130, 202, 157, 0.8)",
          "rgba(255, 149, 0, 0.8)",
          "rgba(255, 99, 132, 0.8)",
        ],
        borderColor: [
          "rgba(74, 144, 226, 1)",
          "rgba(130, 202, 157, 1)",
          "rgba(255, 149, 0, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Traffic Sources",
      },
    },
  };

  return (
    <Box
      sx={{ display: "flex", backgroundColor: "#181818", minHeight: "100vh" }}
    >
      <SidebarAdmin onSectionChange={setSelectedSection} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <HeaderAdmin
          handleDrawerToggle={handleDrawerToggle}
          handleLogout={handleLogout}
          handleProfile={handleProfile}
        />
        {selectedSection === "dashboard" && (
          <>
            {/* Stats Cards */}
            <Grid container spacing={9} sx={{ mb: 3, mt: 2 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card className="dashboard-card">
                  <CardContent>
                    <Typography color="#fff" gutterBottom>
                      Conversion Rate
                    </Typography>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{ mb: 1, color: "#fff" }}
                    >
                      32.53%
                      <Typography
                        component="span"
                        sx={{ color: "error.main", fontSize: "1rem", ml: 1 }}
                      >
                        -0.23%
                      </Typography>
                    </Typography>
                    <LinearProgress variant="determinate" value={32.53} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card className="dashboard-card">
                  <CardContent>
                    <Typography color="#fff" gutterBottom>
                      Total Users
                    </Typography>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{ color: "#fff" }}
                    >
                      7,682
                      <Typography
                        component="span"
                        sx={{ color: "success.main", fontSize: "1rem", ml: 1 }}
                      >
                        +2.6%
                      </Typography>
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={76.82}
                      color="success"
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card className="dashboard-card">
                  <CardContent>
                    <Typography color="#fff" gutterBottom>
                      Average Time
                    </Typography>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{ color: "#fff" }}
                    >
                      2m:35s
                      <Typography
                        component="span"
                        sx={{ color: "warning.main", fontSize: "1rem", ml: 1 }}
                      >
                        +0.8%
                      </Typography>
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={68.8}
                      color="warning"
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card className="dashboard-card">
                  <CardContent>
                    <Typography color="#fff" gutterBottom>
                      Bounce Rate
                    </Typography>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{ color: "#fff" }}
                    >
                      68.8%
                      <Typography
                        component="span"
                        sx={{ color: "error.main", fontSize: "1rem", ml: 1 }}
                      >
                        -1.5%
                      </Typography>
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={68.8}
                      color="error"
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={3}>
              {/* Line Chart */}
              <Grid item xs={12} md={8}>
                <Card className="dashboard-card chart-card">
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "#fff" }}>
                        Market Overview
                      </Typography>
                      <Box>
                        <Tabs
                          value={currentTab}
                          onChange={handleTabChange}
                          textColor="inherit"
                          TabIndicatorProps={{ style: { background: "#fff" } }}
                        >
                          <Tab label="Overview" sx={{ color: "#fff" }} />
                          <Tab label="Analytics" sx={{ color: "#fff" }} />
                          <Tab label="Demographics" sx={{ color: "#fff" }} />
                          <Tab label="More" sx={{ color: "#fff" }} />
                        </Tabs>
                      </Box>
                    </Box>
                    <Box className="chart-container">
                      <Line
                        data={lineChartData}
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            legend: {
                              ...chartOptions.plugins.legend,
                              labels: { color: "#fff" },
                            },
                          },
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Pie Chart */}
              <Grid item xs={12} md={4}>
                <Card className="dashboard-card chart-card">
                  <CardContent>
                    <Box sx={{ height: 300 }}>
                      <Pie
                        data={pieChartData}
                        options={{
                          ...pieChartOptions,
                          plugins: {
                            ...pieChartOptions.plugins,
                            legend: {
                              ...pieChartOptions.plugins.legend,
                              labels: { color: "#fff" },
                            },
                            title: {
                              ...pieChartOptions.plugins.title,
                              color: "#fff",
                            },
                          },
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
        {selectedSection === "users" && (
          <Card className="dashboard-card chart-card" sx={{ mt: 4 }}>
            <CardContent>
              <UserManagement />
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
