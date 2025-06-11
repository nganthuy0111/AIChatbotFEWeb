import React from "react";
import { Fab, Tooltip, Zoom } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";
import "./ChatButton.css";

const ChatButton = () => {
  const navigate = useNavigate();

  return (
    <Zoom in={true} timeout={500}>
      <Tooltip title="Chat with AI" placement="left" arrow>
        <Fab
          className="chat-fab"
          color="primary"
          onClick={() => navigate("/chat")}
          aria-label="chat"
        >
          <ChatIcon />
        </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default ChatButton;
