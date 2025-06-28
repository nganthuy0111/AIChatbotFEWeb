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
            Tạo tài khoản mới
          </Typography>

          <Box component="form" onSubmit={handleSubmit} className="auth-form">
            <TextField
              fullWidth
              label="Địa chỉ email"
              variant="outlined"
              type="email"
              required
              className="auth-input"
            />
            <TextField
              fullWidth
              label="Mật khẩu"
              variant="outlined"
              type="password"
              required
              className="auth-input"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="submit-button"
            >
              Tiếp tục
            </Button>
          </Box>

          <Box className="auth-separator">
            <Divider>
              <Typography variant="body2" color="textSecondary">
                HOẶC
              </Typography>
            </Divider>
          </Box>

          <Box className="social-buttons">
            <button
              type="button"
              className="google-btn"
              onClick={() => {}}
              disabled={false}
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
              <span className="google-text">Tiếp tục với Google</span>
            </button>
          </Box>

          <Box className="auth-footer">
            <Typography variant="body2" color="textSecondary">
              Đã có tài khoản?{" "}
              <Link to="/" className="auth-link">
                Đăng nhập
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
