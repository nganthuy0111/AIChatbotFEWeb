import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  useScrollTrigger,
  Slide,
  Avatar,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import "./HeaderUser.css";

// Component for hiding header on scroll
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const HeaderUser = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { text: "Home", href: "/home" },
    { text: "Search", href: "/laws" },
    { text: "Q&A", href: "/qa" },
    { text: "Guide", href: "/admin" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box className="drawer-container">
      <Box className="drawer-header">
        <img
          src="/src/assets/edulawai.jpg"
          alt="EduLawAI Logo"
          className="drawer-logo"
        />
        <Typography variant="h6" className="drawer-title">
          EduLawAI
        </Typography>
      </Box>
      <List className="drawer-list">
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            onClick={() => {
              navigate(item.href);
              handleDrawerToggle();
            }}
            className="drawer-item"
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <HideOnScroll>
      <AppBar
        className={`header ${isScrolled ? "header-scrolled" : ""}`}
        elevation={isScrolled ? 4 : 0}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters className="toolbar">
            {/* Logo Section */}
            <Box className="logo-container" onClick={() => navigate("/home")}>
              <img
                src="/src/assets/edulawai.jpg"
                alt="EduLawAI Logo"
                className="logo"
              />
              <Typography variant="h6" className="brand-text">
                EduLawAI
              </Typography>
            </Box>

            {/* Mobile Menu Icon */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className="mobile-menu-button"
            >
              <MenuIcon />
            </IconButton>

            {/* Desktop Menu Items */}
            <Box className="desktop-menu">
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  onClick={() => navigate(item.href)}
                  className="nav-button"
                >
                  {item.text}
                </Button>
              ))}
            </Box>

            {/* Right Section - Notifications & Profile */}
            <Box className="right-section">
              <IconButton color="inherit" className="notification-button">
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Avatar
                alt="User Profile"
                src="/src/assets/default-avatar.png"
                className="profile-avatar"
                onClick={() => navigate("/profile")}
              />
            </Box>
          </Toolbar>
        </Container>

        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          className="mobile-drawer"
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </AppBar>
    </HideOnScroll>
  );
};

export default HeaderUser;
