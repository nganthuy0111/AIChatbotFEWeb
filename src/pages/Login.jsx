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
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import api from "../config/axios";
import useAuth from "../hooks/useAuth";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const response = await api.post("/Authenticate/login", {
        email: formData.email,
        password: formData.password,
        twoFactorCode: null,
        twoFactorRecoveryCode: null,
      });

      if (response.data.token) {
        let userRole =
          response.data.role ||
          response.data.user?.role ||
          response.data.userRole ||
          "User";

        const userEmail = formData.email.toLowerCase();
        const isAdminEmail =
          userEmail.includes("admin") ||
          userEmail.includes("administrator") ||
          userEmail === "admin@example.com" ||
          userEmail === "admin@gmail.com";

        if (
          isAdminEmail ||
          response.data.isAdmin ||
          response.data.user?.isAdmin
        ) {
          userRole = "Admin";
        }

        login(response.data.token, userRole, response.data.userId);

        if (userRole === "Admin" || userRole === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        setError("Login successful but no token received");
        setShowError(true);
      }
    } catch (error) {
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
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      login("google-token", "User", result.user.uid);
      navigate("/home");
    } catch (error) {
      setError(error.message);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="login-page">
      <Container maxWidth="sm">
        <Box className="login-container">
          <Box className="logo-section">
            <img
              src="/src/assets/logoEduLawAI.png"
              alt="ELA Logo"
              className="auth-logo"
            />
            <Typography variant="h4" className="auth-title">
              ELA
            </Typography>
          </Box>

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
              disabled={loading}
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
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="submit-button"
              disabled={loading}
              startIcon={
                loading ? <CircularProgress size={22} color="inherit" /> : null
              }
            >
              {loading ? "Signing in..." : "Sign In"}
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
            <button
              type="button"
              className="google-btn"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <span className="google-icon">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <g>
                    <path
                      fill="#7cff00"
                      d="M21.35 11.1h-9.18v2.92h5.98c-.26 1.36-1.56 4-5.98 4-3.6 0-6.54-2.97-6.54-6.62s2.94-6.62 6.54-6.62c2.05 0 3.43.82 4.22 1.53l2.88-2.8C17.1 2.98 14.9 2 12.17 2 6.7 2 2.17 6.48 2.17 12s4.53 10 10 10c5.75 0 9.56-4.03 9.56-9.7 0-.65-.07-1.15-.18-1.6z"
                    />
                  </g>
                </svg>
              </span>
              <span className="google-text">Continue with Google</span>
            </button>
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
