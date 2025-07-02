import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  InputBase,
  Typography,
  MenuItem,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import SettingsIcon from "@mui/icons-material/Settings";

const HeaderAdmin = ({ handleDrawerToggle, handleLogout, handleProfile }) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#232323",
        color: "#cdff09",
        boxShadow: "0 2px 8px #cdff0933",
        borderBottom: "1px solid #cdff09",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, color: "#cdff09" }}
        >
          Admin Dashboard
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <InputBase
            placeholder="Tìm kiếm…"
            inputProps={{ "aria-label": "search" }}
            sx={{
              ml: 1,
              p: "2px 4px",
              border: "1px solid #cdff09",
              borderRadius: 1,
              color: "#fff",
              "& .MuiInputBase-input": {
                color: "#fff",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#d4ff33",
                opacity: 0.7,
              },
            }}
            startAdornment={
              <SearchIcon sx={{ ml: 1, mr: 1, color: "#cdff09" }} />
            }
          />
          <IconButton color="inherit" sx={{ ml: 2, color: "#cdff09" }}>
            <Badge
              badgeContent={1}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#cdff09",
                  color: "#181818",
                },
              }}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" sx={{ ml: 2, color: "#cdff09" }}>
            <AccountCircleIcon />
          </IconButton>
        </Box>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <Tooltip title="Open settings">
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAdmin;
