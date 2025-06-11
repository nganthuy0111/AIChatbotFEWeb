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
      title: "Educational Rights and Responsibilities",
      preview: "What are the basic rights of students...",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      title: "School Regulations Query",
      preview: "Can schools implement dress codes...",
      timestamp: "Yesterday",
    },
    {
      id: 3,
      title: "Teacher Certification",
      preview: "What are the requirements for...",
      timestamp: "2 days ago",
    },
  ];

  return (
    <Box className="chat-sidebar">
      {/* New Chat Button */}
      <Box className="sidebar-header">
        <IconButton className="new-chat-button" onClick={onNewChat}>
          <AddIcon />
          <Typography variant="button">New Chat</Typography>
        </IconButton>
      </Box>

      {/* Search Bar */}
      <Box className="search-container">
        <Box className="search-box">
          <SearchIcon className="search-icon" />
          <InputBase
            placeholder="Search conversations..."
            className="search-input"
          />
        </Box>
      </Box>

      <Divider className="sidebar-divider" />

      {/* Recent Chats */}
      <Box className="recent-chats">
        <Typography variant="subtitle2" className="section-title">
          <HistoryIcon className="section-icon" />
          Recent Conversations
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
          Clear all conversations
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatSidebar;
