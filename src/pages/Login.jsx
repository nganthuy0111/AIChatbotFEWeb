import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  Snackbar,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import api from "../config/axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowError(false);

    // Log the request data
    console.log("Sending login request with data:", {
      ...formData,
      password: "***", // Hide password in logs
    });

    try {
      const response = await api.post("/api/Authenticate/login", {
        email: formData.email,
        password: formData.password,
        twoFactorCode: null,
        twoFactorRecoveryCode: null,
      });

      console.log("Login response:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        setError("Login successful but no token received");
        setShowError(true);
      }
    } catch (error) {
      console.error("Login error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      let errorMessage = "An error occurred during login";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data) {
        errorMessage =
          typeof error.response.data === "string"
            ? error.response.data
            : JSON.stringify(error.response.data);
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      setShowError(true);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google login successful:", result.user);
      navigate("/home");
    } catch (error) {
      console.error("Error during Google login:", error);
      setError(error.message);
      setShowError(true);
    }
  };

  return (
    <Box className="login-page">
      <Container maxWidth="sm">
        <Box className="login-container">
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
            Welcome to EduLawAI!
          </Typography>

          <Box component="form" onSubmit={handleSubmit} className="auth-form">
            <TextField
              fullWidth
              label="Email address"
              variant="outlined"
              type="email"
              required
              className="auth-input"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              required
              className="auth-input"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="submit-button"
            >
              Login
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
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </Button>
          </Box>

          <Box className="auth-footer">
            <Typography variant="body2" color="textSecondary">
              Don't have an account?{" "}
              <Link to="/register" className="auth-link">
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
