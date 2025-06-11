import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  InputBase,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";

const HeaderAdmin = ({ handleDrawerToggle }) => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#fff", color: "#000", boxShadow: 1 }}
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
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <InputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            sx={{
              ml: 1,
              p: "2px 4px",
              border: "1px solid #ccc",
              borderRadius: 1,
            }}
            startAdornment={<SearchIcon sx={{ ml: 1, mr: 1 }} />}
          />
          <IconButton color="inherit" sx={{ ml: 2 }}>
            <Badge badgeContent={1} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" sx={{ ml: 2 }}>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAdmin;
