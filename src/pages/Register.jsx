import React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { Google, Apple, Microsoft } from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/Phone";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <Box className="register-page">
      <Container maxWidth="sm">
        <Box className="register-container">
          <Box className="logo-section">
            <img
              src="/src/assets/edulawai.jpg"
              alt="EduLawAI Logo"
              className="auth-logo"
            />
            <Typography variant="h4" className="auth-title">
              EduLawAI
            </Typography>
          </Box>

          <Typography variant="h5" className="section-title">
            Create an account
          </Typography>

          <Box component="form" onSubmit={handleSubmit} className="auth-form">
            <TextField
              fullWidth
              label="Email address"
              variant="outlined"
              type="email"
              required
              className="auth-input"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="submit-button"
            >
              Continue
            </Button>
          </Box>

          <Box className="auth-separator">
            <Divider>
              <Typography variant="body2" color="textSecondary">
                OR
              </Typography>
            </Divider>
          </Box>

          <Box className="social-buttons">
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              className="social-button google"
            >
              Continue with Google
            </Button>
          </Box>

          <Box className="auth-footer">
            <Typography variant="body2" color="textSecondary">
              Already have an account?{" "}
              <Link to="/" className="auth-link">
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
