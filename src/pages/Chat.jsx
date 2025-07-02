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
import api from "../config/axios";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm EduLawAI, how can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to decode JWT to get userId
  function parseJwt(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

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

    // Lấy userId từ token
    const token = localStorage.getItem("token");
    let userId = null;
    if (token) {
      const payload = parseJwt(token);
      userId = payload && (payload.userId || payload["userId"]);
    }
    console.log("[DEBUG] token:", token);
    console.log("[DEBUG] userId:", userId);

    setIsTyping(true);
    try {
      if (!userId)
        throw new Error("Không xác định được userId. Vui lòng đăng nhập lại.");
      // Gửi câu hỏi lên API (userId là query, body là string)
      const questionRes = await api.post(
        `/Question?userId=${userId}`,
        newMessage,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const questionId = questionRes.data.questionId;
      if (!questionId) throw new Error("Không lấy được questionId từ API.");
      // Gọi API lấy answer theo questionId
      const answerRes = await api.get(`/Answer?questionId=${questionId}`);
      // Lấy nội dung trả lời từ trường ansContent
      const answerText =
        answerRes.data.ansContent || "Chưa có câu trả lời cho câu hỏi này.";
      const botMessage = {
        id: messages.length + 2,
        text: answerText,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      // Hiển thị lỗi từ API
      const botMessage = {
        id: messages.length + 2,
        text:
          err.response?.data?.message ||
          err.message ||
          "Đã xảy ra lỗi khi gửi câu hỏi. Vui lòng thử lại.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm EduLawAI, how can I assist you today?",
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
                placeholder="Nhập tin nhắn của bạn..."
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
