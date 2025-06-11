import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    role: "",
    password: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("api/User/getall");
      setUsers(response.data);
    } catch (error) {
      showSnackbar("Error fetching users", "error");
    }
  };

  const handleOpenDialog = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setFormData({
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        password: "",
      });
    } else {
      setSelectedUser(null);
      setFormData({
        email: "",
        fullName: "",
        role: "",
        password: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setFormData({
      email: "",
      fullName: "",
      role: "",
      password: "",
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        // Update user
        await axios.put(`api/users/${selectedUser._id}`, formData);
        showSnackbar("User updated successfully");
      } else {
        // Create user
        await axios.post("/api/users", formData);
        showSnackbar("User created successfully");
      }
      fetchUsers();
      handleCloseDialog();
    } catch (error) {
      showSnackbar(
        error.response?.data?.message || "Error processing request",
        "error"
      );
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/users/${userId}`);
        showSnackbar("User deleted successfully");
        fetchUsers();
      } catch (error) {
        showSnackbar("Error deleting user", "error");
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenDialog(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedUser ? "Edit User" : "Add New User"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              name="fullName"
              label="Full Name"
              type="text"
              fullWidth
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              name="role"
              label="Role"
              type="text"
              fullWidth
              value={formData.role}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              name="password"
              label="Password"
              type="password"
              fullWidth
              value={formData.password}
              onChange={handleInputChange}
              required={!selectedUser}
              helperText={
                selectedUser ? "Leave blank to keep current password" : ""
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedUser ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;
