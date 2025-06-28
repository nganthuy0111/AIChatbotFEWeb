import React from "react";
import { Paper, Typography } from "@mui/material";

const FixedIssuesCard = () => {
  return (
    <Paper
      sx={{
        p: 1,
        textAlign: "center",
        backgroundColor: "#ffebee",
        color: "#f44336",
      }}
    >
      <Typography variant="h6">Vấn đề đã sửa</Typography>
      <Typography variant="h4">75</Typography>
      <Typography variant="body2" color="text.secondary">
        Theo dõi từ GitHub
      </Typography>
    </Paper>
  );
};

export default FixedIssuesCard;
