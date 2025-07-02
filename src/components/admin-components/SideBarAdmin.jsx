import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";

const SidebarAdmin = ({ onSectionChange }) => {
  // const navigate = useNavigate();
  // const location = useLocation();

  const sidebarItems = [
    { text: "Dashboard", icon: "📊", section: "dashboard" },
    { text: "User Management", icon: "👤", section: "users" },
    { text: "Search", icon: "📋", section: "legal" },
    { text: "Clause Management", icon: "✍️", section: "clause" },
    { text: "Q&A Management", icon: "⭐", section: "qa" },
    { text: "Bản đồ", icon: "🗺️", section: "maps" },
    { text: "Thông báo", icon: "🔔", section: "notifications" },
  ];

  // const handleNavigation = (path) => {
  //   navigate(path);
  // };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#181818",
          borderRight: "1px solid #cdff09",
          color: "#fff",
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
          borderBottom: "1px solid #cdff09",
        }}
      >
        <Box
          component="img"
          src="/src/assets/edulawai.jpg"
          alt="EduLawAI"
          sx={{
            height: 40,
            width: 40,
            objectFit: "contain",
            borderRadius: "8px",
            boxShadow: "0 0 8px #cdff0933",
          }}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{
            ml: 1,
            display: { xs: "none", sm: "block" },
            color: "#cdff09",
            fontWeight: 600,
          }}
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
              onClick={() => onSectionChange(item.section)}
              sx={{
                "&:hover": {
                  backgroundColor: "#232323",
                  borderLeft: "3px solid #cdff09",
                },
                // backgroundColor:
                //   location.pathname === item.path ? "#232323" : "transparent",
                // borderLeft: location.pathname === item.path ? "3px solid #cdff09" : "3px solid transparent",
                // color: location.pathname === item.path ? "#cdff09" : "#fff",
                transition: "all 0.3s ease",
                // "& .MuiListItemText-primary": {
                //   color: location.pathname === item.path ? "#cdff09" : "#fff",
                //   fontWeight: location.pathname === item.path ? 600 : 400,
                // },
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
