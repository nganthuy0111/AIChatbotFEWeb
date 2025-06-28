import React from "react";
import { useNavigate } from "react-router-dom";
import "./ChatButton.css";

const ChatButton = () => {
  const navigate = useNavigate();

  return (
    <div className="chat-button-container">
      <button
        className="chat-button"
        onClick={() => navigate("/chat")}
        aria-label="Trò chuyện với AI"
        title="Trò chuyện với AI"
      >
        <svg
          className="chat-icon"
          viewBox="0 0 24 24"
          fill="#000"
          width="24"
          height="24"
        >
          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
        </svg>
      </button>
    </div>
  );
};

export default ChatButton;
