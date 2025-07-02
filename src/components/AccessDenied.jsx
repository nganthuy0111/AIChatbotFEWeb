import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
        }}
      >
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          style={{ fontSize: "4rem", color: "#ff6b6b", marginBottom: "2rem" }}
        />
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "#fff" }}
        >
          Truy cập bị từ chối
        </Typography>
        <Typography variant="body1" sx={{ color: "#ccc", mb: 3 }}>
          Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị
          viên nếu bạn cần quyền truy cập.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/home")}
          sx={{
            backgroundColor: "#cdff09",
            color: "#181818",
            "&:hover": {
              backgroundColor: "#b8e609",
            },
          }}
        >
          Về trang chủ
        </Button>
      </Box>
    </Container>
  );
};

export default AccessDenied;
