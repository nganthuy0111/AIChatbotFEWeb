import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHandshake,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import HeaderUser from "../components/user-components/HeaderUser";
import Footer from "../components/Footer";

const values = [
  {
    icon: faStar,
    title: "Quality & Trust",
    desc: "Committed to providing accurate, up-to-date, and transparent education law information for all users.",
  },
  {
    icon: faHandshake,
    title: "Dedicated Support",
    desc: "Our team is always ready to listen, answer, and accompany users in all education law matters.",
  },
  {
    icon: faLightbulb,
    title: "Innovation",
    desc: "Continuously applying AI technology and improving the product to deliver the best experience.",
  },
];

const About = () => {
  return (
    <Box sx={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      <HeaderUser />
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 10 },
          textAlign: "center",
          background: "linear-gradient(90deg, #000 60%, #232323 100%)",
        }}
      >
        <Container maxWidth="md">
          {/* <Avatar src="/src/assets/logo.png" alt="ELA" sx={{ width: 96, height: 96, mx: "auto", mb: 2, border: "3px solid #cdff09", bgcolor: "#181818" }} /> */}
          <img
            src="/src/assets/logo.png"
            alt="ELA"
            style={{
              width: 96,
              height: 96,
              margin: "0 auto 16px",
              border: "3px solid #cdff09",
              borderRadius: "50%",
              background: "#181818",
              display: "block",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: "#cdff09",
              mb: 2,
              fontSize: { xs: 32, md: 48 },
            }}
          >
            About ELA
          </Typography>
          <Typography
            variant="h5"
            sx={{ mb: 3, color: "#fff", fontWeight: 400 }}
          >
            An AI chatbot platform for education law search, connecting
            knowledge and community.
          </Typography>
          <Button
            href="/search"
            variant="contained"
            sx={{
              background: "#cdff09",
              color: "#181818",
              fontWeight: 700,
              fontSize: 18,
              px: 4,
              py: 1.5,
              mt: 2,
            }}
          >
            Start Searching
          </Button>
        </Container>
      </Box>
      {/* Mission & Vision */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{ color: "#cdff09", fontWeight: 700, mb: 2 }}
            >
              Mission
            </Typography>
            <Typography variant="body1" sx={{ color: "#fff", mb: 3 }}>
              To provide a smart, user-friendly tool for searching education
              law, helping everyone access legal knowledge equally, quickly, and
              accurately.
            </Typography>
            <Typography
              variant="h4"
              sx={{ color: "#cdff09", fontWeight: 700, mb: 2 }}
            >
              Vision
            </Typography>
            <Typography variant="body1" sx={{ color: "#fff" }}>
              To become the leading education law support platform in Vietnam,
              pioneering AI applications for the community.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      {/* Core Values */}
      <Box sx={{ background: "#181818", py: 6 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            align="center"
            sx={{ color: "#cdff09", fontWeight: 700, mb: 4 }}
          >
            Core Values
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="stretch"
            wrap="nowrap"
            sx={{ overflowX: { xs: "auto", md: "visible" } }}
          >
            {values.map((v) => (
              <Grid
                item
                xs={12}
                md={4}
                key={v.title}
                sx={{ display: "flex", maxWidth: { md: 320 }, minWidth: 240 }}
              >
                <Card
                  sx={{
                    background: "#232323",
                    color: "#fff",
                    textAlign: "center",
                    py: 2,
                    px: 1,
                    boxShadow: "0 4px 24px #0004",
                    borderRadius: 4,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <FontAwesomeIcon
                    icon={v.icon}
                    size="2x"
                    style={{ color: "#cdff09", marginBottom: 12 }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 0 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#cdff09",
                        fontWeight: 600,
                        mb: 1,
                        fontSize: 18,
                      }}
                    >
                      {v.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#fff", fontSize: 14 }}
                    >
                      {v.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
