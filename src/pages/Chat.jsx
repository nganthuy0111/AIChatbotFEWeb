import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  IconButton,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MenuIcon from "@mui/icons-material/Menu";
import HeaderUser from "../components/user-components/HeaderUser";
import ChatSidebar from "../components/ChatSidebar";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm EduLawAI, how can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      // Add bot response
      const botMessage = {
        id: messages.length + 2,
        text: "This is a sample response. Integrate your API here.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hi! I'm EduLawAI, how can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    setIsSidebarOpen(false);
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Box className="chat-page">
      <HeaderUser />
      <Box className="chat-content">
        <ChatSidebar
          onNewChat={handleNewChat}
          className={isSidebarOpen ? "open" : ""}
        />
        <Box className="main-chat">
          <Box className="chat-header">
            <IconButton
              className="menu-button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5">Chat with EduLawAI</Typography>
          </Box>

          <Paper className="chat-box">
            <Box className="messages-container">
              {messages.map((message) => (
                <Box
                  key={message.id}
                  className={`message ${
                    message.sender === "bot" ? "bot" : "user"
                  }`}
                >
                  {message.sender === "bot" && (
                    <Avatar
                      src="/src/assets/edulawai.jpg"
                      className="bot-avatar"
                    />
                  )}
                  <Box className="message-content">
                    <Typography variant="body1">{message.text}</Typography>
                    <Typography variant="caption" className="timestamp">
                      {formatTime(message.timestamp)}
                    </Typography>
                  </Box>
                </Box>
              ))}
              {isTyping && (
                <Box className="message bot">
                  <Avatar
                    src="/src/assets/edulawai.jpg"
                    className="bot-avatar"
                  />
                  <Box className="typing-indicator">
                    <CircularProgress size={20} />
                  </Box>
                </Box>
              )}
            </Box>

            <Box
              component="form"
              onSubmit={handleSendMessage}
              className="chat-input-container"
            >
              <IconButton className="attach-button">
                <AttachFileIcon />
              </IconButton>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="chat-input"
              />
              <IconButton
                type="submit"
                disabled={!newMessage.trim()}
                className="send-button"
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
