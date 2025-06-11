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
      <Typography variant="h6">Fixed Issues</Typography>
      <Typography variant="h4">75</Typography>
      <Typography variant="body2" color="text.secondary">
        Tracked from GitHub
      </Typography>
    </Paper>
  );
};

export default FixedIssuesCard;
