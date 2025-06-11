import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { text: "Dashboard", icon: "📊", path: "/admin/dashboard" },
    { text: "User Management", icon: "👤", path: "/admin/users" },
    { text: "Legal Management", icon: "📋", path: "/admin/legal" },
    { text: "Clause Management", icon: "✍️", path: "/admin/clause" },
    { text: "Q&A Management", icon: "⭐", path: "/admin/qa" },
    { text: "Maps", icon: "🗺️", path: "/admin/maps" },
    { text: "Notifications", icon: "🔔", path: "/admin/notifications" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#f7f8f3",
        },
      }}
    >
      <Box
        component="a"
        href="/home"
        sx={{
          display: "flex",
          alignItems: "center",
          mr: 2,
          textDecoration: "none",
          p: 2,
        }}
      >
        <Box
          component="img"
          src="/src/assets/edulawai.jpg"
          alt="EduLawAI"
          sx={{ height: 40, width: 40, objectFit: "contain" }}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{ ml: 1, display: { xs: "none", sm: "block" } }}
        >
          EduLawAI
        </Typography>
      </Box>
      <Box sx={{ overflow: "auto" }}>
        <List>
          {sidebarItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleNavigation(item.path)}
              sx={{
                "&:hover": { backgroundColor: "#e0e0e0" },
                backgroundColor:
                  location.pathname === item.path ? "#e0e0e0" : "transparent",
              }}
            >
              <ListItemText primary={`${item.icon} ${item.text}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SidebarAdmin;
