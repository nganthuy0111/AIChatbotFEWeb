import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  InputBase,
  Divider,
  Button,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Chat as ChatIcon,
  Delete as DeleteIcon,
  History as HistoryIcon,
} from "@mui/icons-material";
import "./ChatSidebar.css";

const ChatSidebar = ({ onNewChat }) => {
  const chatHistory = [
    {
      id: 1,
      title: "Quyền và trách nhiệm giáo dục",
      preview: "Những quyền cơ bản của học sinh là gì...",
      timestamp: "2 giờ trước",
    },
    {
      id: 2,
      title: "Truy vấn quy định trường học",
      preview: "Trường học có thể áp dụng quy định về trang phục...",
      timestamp: "Hôm qua",
    },
    {
      id: 3,
      title: "Chứng chỉ giáo viên",
      preview: "Những yêu cầu để...",
      timestamp: "2 ngày trước",
    },
  ];

  return (
    <Box className="chat-sidebar">
      {/* New Chat Button */}
      <Box className="sidebar-header">
        <Button
          variant="contained"
          onClick={onNewChat}
          className="new-chat-button"
          startIcon={<AddIcon />}
        >
          New Chat
        </Button>
      </Box>

      <Divider className="sidebar-divider" />

      {/* Recent Chats */}
      <Box className="recent-chats">
        <Typography variant="subtitle2" className="section-title">
          <HistoryIcon className="section-icon" />
          Cuộc trò chuyện gần đây
        </Typography>
        <List className="chat-list">
          {chatHistory.map((chat) => (
            <ListItem key={chat.id} className="chat-list-item">
              <ListItemIcon>
                <ChatIcon className="chat-icon" />
              </ListItemIcon>
              <ListItemText
                primary={chat.title}
                secondary={chat.preview}
                className="chat-text"
                secondaryTypographyProps={{
                  className: "chat-preview",
                }}
              />
              <Typography variant="caption" className="chat-timestamp">
                {chat.timestamp}
              </Typography>
              <IconButton className="delete-button" size="small">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Box className="sidebar-footer">
        <Typography variant="caption" className="footer-text">
          Xóa tất cả cuộc trò chuyện
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatSidebar;
