import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  TablePagination,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import axios from "../../config/axios";

const DEFAULT_AVT = "/src/assets/edulawai.jpg";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // add | edit | view
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    password: "",
    image: "",
    userStatus: "Active",
    role: "User",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [search, users]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/User");
      setUsers(res.data);
    } catch {
      setSnackbar({
        open: true,
        message: "Lỗi tải danh sách người dùng",
        severity: "error",
      });
    }
  };

  const handleFilter = () => {
    if (!search) setFilteredUsers(users);
    else {
      setFilteredUsers(
        users.filter(
          (u) =>
            u.userName.toLowerCase().includes(search.toLowerCase()) ||
            u.userEmail.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  const handleChangePage = (e, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const handleOpenDialog = (mode, user = null) => {
    setDialogMode(mode);
    setSelectedUser(user);
    if (mode === "edit" || mode === "view") {
      setFormData({
        userName: user.userName,
        userEmail: user.userEmail,
        password: "",
        image: user.image || "",
        userStatus: user.userStatus,
        role: user.role,
      });
    } else {
      setFormData({
        userName: "",
        userEmail: "",
        password: "",
        image: "",
        userStatus: "Active",
        role: "User",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (dialogMode === "edit" && selectedUser) {
        await axios.put(`/User/${selectedUser.userId}`, formData);
        setSnackbar({
          open: true,
          message: "Cập nhật người dùng thành công",
          severity: "success",
        });
      } else if (dialogMode === "add") {
        await axios.post("/User", {
          userId: `US${Date.now()}`,
          userName: formData.userEmail.split("@")[0] || "",
          userEmail: formData.userEmail,
          password: formData.password,
          image: "",
          userStatus: "Active",
          role: "User",
          createdAt: new Date().toISOString(),
          questions: [],
        });
        setSnackbar({
          open: true,
          message: "Thêm người dùng thành công",
          severity: "success",
        });
      }
      fetchUsers();
      handleCloseDialog();
    } catch {
      setSnackbar({
        open: true,
        message: "Lỗi xử lý người dùng",
        severity: "error",
      });
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Bạn chắc chắn muốn xóa người dùng này?")) {
      try {
        await axios.delete(`/User/${userId}`);
        setSnackbar({
          open: true,
          message: "Xóa người dùng thành công",
          severity: "success",
        });
        fetchUsers();
      } catch {
        setSnackbar({
          open: true,
          message: "Lỗi xóa người dùng",
          severity: "error",
        });
      }
    }
  };

  // Pagination data
  const pagedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ p: 3, minHeight: "100vh", background: "#181818" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" color="#cdff09">
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog("add")}
          sx={{ background: "#cdff09", color: "#181818", fontWeight: 600 }}
        >
          Add User
        </Button>
      </Box>
      <TextField
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          style: { color: "#fff" },
        }}
        sx={{
          mb: 2,
          width: 350,
          background: "#232323",
          borderRadius: 1,
          input: { color: "#fff" },
        }}
        size="small"
      />
      <TableContainer
        component={Paper}
        sx={{ background: "#181818", borderRadius: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Avatar</TableCell>
              <TableCell sx={{ color: "#fff" }}>Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Email</TableCell>
              <TableCell sx={{ color: "#fff" }}>Status</TableCell>
              <TableCell sx={{ color: "#fff" }}>Role</TableCell>
              <TableCell sx={{ color: "#fff" }}>Created At</TableCell>
              <TableCell align="right" sx={{ color: "#fff" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagedUsers.map((user) => (
              <TableRow key={user.userId} hover>
                <TableCell sx={{ color: "#fff" }}>
                  <Avatar
                    src={user.image || DEFAULT_AVT}
                    alt={user.userName}
                    sx={{ width: 36, height: 36, border: "2px solid #cdff09" }}
                  />
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.userName}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.userEmail}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.userStatus}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.role}</TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleString()
                    : ""}
                </TableCell>
                <TableCell align="right" sx={{ color: "#fff" }}>
                  <IconButton
                    onClick={() => handleOpenDialog("view", user)}
                    title="View"
                  >
                    <VisibilityIcon sx={{ color: "#cdff09" }} />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenDialog("edit", user)}
                    title="Edit"
                  >
                    <EditIcon sx={{ color: "#d4ff33" }} />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(user.userId)}
                    title="Delete"
                  >
                    <DeleteIcon sx={{ color: "#ff4d4d" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{
            color: "#fff",
            ".MuiTablePagination-selectLabel": { color: "#fff" },
            ".MuiTablePagination-displayedRows": { color: "#fff" },
            ".MuiSvgIcon-root": { color: "#fff" },
            ".MuiInputBase-root": { color: "#fff" },
            ".MuiSelect-icon": { color: "#fff" },
            ".MuiTablePagination-actions button": { color: "#fff" },
          }}
        />
      </TableContainer>

      {/* Dialog for Add/Edit/View */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { background: "#232323", color: "#fff" } }}
      >
        <DialogTitle sx={{ background: "#181818", color: "#fff" }}>
          {dialogMode === "add" && "Add New User"}
          {dialogMode === "edit" && "Edit User"}
          {dialogMode === "view" && "User Details"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ color: "#fff" }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Avatar
                src={formData.image || DEFAULT_AVT}
                alt={formData.userName}
                sx={{ width: 64, height: 64, border: "2px solid #cdff09" }}
              />
            </Box>
            {dialogMode !== "add" && (
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    color: "#cdff09",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  Name *
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  placeholder="Enter user name"
                  required
                  disabled={dialogMode === "view"}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: 6,
                    border: "1px solid #444",
                    background: "#181818",
                    color: "#fff",
                    fontSize: 16,
                    marginBottom: 8,
                    outline: "none",
                  }}
                />
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{ color: "#cdff09", display: "block", marginBottom: 4 }}
              >
                Email *
              </label>
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleInputChange}
                placeholder="admin@example.com"
                required
                disabled={dialogMode === "view"}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: 6,
                  border: "1px solid #444",
                  background: "#181818",
                  color: "#fff",
                  fontSize: 16,
                  marginBottom: 8,
                  outline: "none",
                }}
              />
            </div>
            {dialogMode !== "view" && (
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    color: "#cdff09",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={
                    dialogMode === "edit"
                      ? "Leave blank if not changing password"
                      : "Enter password"
                  }
                  required={dialogMode === "add"}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: 6,
                    border: "1px solid #444",
                    background: "#181818",
                    color: "#fff",
                    fontSize: 16,
                    marginBottom: 8,
                    outline: "none",
                  }}
                />
              </div>
            )}
            {dialogMode !== "add" && (
              <>
                <div style={{ marginBottom: 16 }}>
                  <label
                    style={{
                      color: "#cdff09",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Avatar URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Avatar URL"
                    disabled={dialogMode === "view"}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: 6,
                      border: "1px solid #444",
                      background: "#181818",
                      color: "#fff",
                      fontSize: 16,
                      marginBottom: 8,
                      outline: "none",
                    }}
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label
                    style={{
                      color: "#cdff09",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Status *
                  </label>
                  <input
                    type="text"
                    name="userStatus"
                    value={formData.userStatus}
                    onChange={handleInputChange}
                    placeholder="Active"
                    required
                    disabled={dialogMode === "view"}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: 6,
                      border: "1px solid #444",
                      background: "#181818",
                      color: "#fff",
                      fontSize: 16,
                      marginBottom: 8,
                      outline: "none",
                    }}
                  />
                </div>
                {dialogMode === "edit" && (
                  <div style={{ marginBottom: 16 }}>
                    <label
                      style={{
                        color: "#cdff09",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      Role *
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: 6,
                        border: "1px solid #444",
                        background: "#181818",
                        color: "#fff",
                        fontSize: 16,
                        marginBottom: 8,
                        outline: "none",
                      }}
                    >
                      <option value="User" style={{ color: "#000" }}>
                        User
                      </option>
                      <option value="Admin" style={{ color: "#000" }}>
                        Admin
                      </option>
                    </select>
                  </div>
                )}
                {dialogMode === "view" && (
                  <div style={{ marginBottom: 16 }}>
                    <label
                      style={{
                        color: "#cdff09",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      Role *
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      disabled
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: 6,
                        border: "1px solid #444",
                        background: "#181818",
                        color: "#fff",
                        fontSize: 16,
                        marginBottom: 8,
                        outline: "none",
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
            {dialogMode !== "view" && (
              <Button
                type="submit"
                variant="contained"
                sx={{ background: "#cdff09", color: "#181818" }}
              >
                {dialogMode === "add" ? "Create" : "Update"}
              </Button>
            )}
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
