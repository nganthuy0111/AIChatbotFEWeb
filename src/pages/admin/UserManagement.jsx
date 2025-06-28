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
        await axios.post("/User", formData);
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
          Quản lý người dùng
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog("add")}
          sx={{ background: "#cdff09", color: "#181818", fontWeight: 600 }}
        >
          Thêm người dùng
        </Button>
      </Box>
      <TextField
        placeholder="Tìm kiếm theo tên hoặc email..."
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
              <TableCell sx={{ color: "#fff" }}>Ảnh đại diện</TableCell>
              <TableCell sx={{ color: "#fff" }}>Tên</TableCell>
              <TableCell sx={{ color: "#fff" }}>Email</TableCell>
              <TableCell sx={{ color: "#fff" }}>Trạng thái</TableCell>
              <TableCell sx={{ color: "#fff" }}>Vai trò</TableCell>
              <TableCell sx={{ color: "#fff" }}>Ngày tạo</TableCell>
              <TableCell align="right" sx={{ color: "#fff" }}>
                Hành động
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
                    title="Xem"
                  >
                    <VisibilityIcon sx={{ color: "#cdff09" }} />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenDialog("edit", user)}
                    title="Sửa"
                  >
                    <EditIcon sx={{ color: "#d4ff33" }} />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(user.userId)}
                    title="Xóa"
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
        <DialogTitle sx={{ color: "#cdff09" }}>
          {dialogMode === "add" && "Thêm người dùng mới"}
          {dialogMode === "edit" && "Sửa người dùng"}
          {dialogMode === "view" && "Chi tiết người dùng"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Avatar
                src={formData.image || DEFAULT_AVT}
                alt={formData.userName}
                sx={{ width: 64, height: 64, border: "2px solid #cdff09" }}
              />
            </Box>
            <TextField
              margin="dense"
              name="userName"
              label="Tên"
              type="text"
              fullWidth
              value={formData.userName}
              onChange={handleInputChange}
              required
              disabled={dialogMode === "view"}
              InputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#d4ff33" } }}
              sx={{ input: { color: "#fff" } }}
            />
            <TextField
              margin="dense"
              name="userEmail"
              label="Email"
              type="email"
              fullWidth
              value={formData.userEmail}
              onChange={handleInputChange}
              required
              disabled={dialogMode === "view"}
              InputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#d4ff33" } }}
              sx={{ input: { color: "#fff" } }}
            />
            {dialogMode !== "view" && (
              <TextField
                margin="dense"
                name="password"
                label="Mật khẩu"
                type="password"
                fullWidth
                value={formData.password}
                onChange={handleInputChange}
                required={dialogMode === "add"}
                helperText={
                  dialogMode === "edit" ? "Để trống nếu không đổi mật khẩu" : ""
                }
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#d4ff33" } }}
                sx={{ input: { color: "#fff" } }}
              />
            )}
            <TextField
              margin="dense"
              name="image"
              label="URL ảnh đại diện"
              type="text"
              fullWidth
              value={formData.image}
              onChange={handleInputChange}
              disabled={dialogMode === "view"}
              InputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#d4ff33" } }}
              sx={{ input: { color: "#fff" } }}
            />
            <TextField
              margin="dense"
              name="userStatus"
              label="Trạng thái"
              type="text"
              fullWidth
              value={formData.userStatus}
              onChange={handleInputChange}
              required
              disabled={dialogMode === "view"}
              InputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#d4ff33" } }}
              sx={{ input: { color: "#fff" } }}
            />
            <TextField
              margin="dense"
              name="role"
              label="Vai trò"
              type="text"
              fullWidth
              value={formData.role}
              onChange={handleInputChange}
              required
              disabled={dialogMode === "view"}
              InputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#d4ff33" } }}
              sx={{ input: { color: "#fff" } }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Đóng</Button>
            {dialogMode !== "view" && (
              <Button
                type="submit"
                variant="contained"
                sx={{ background: "#cdff09", color: "#181818" }}
              >
                {dialogMode === "add" ? "Tạo" : "Cập nhật"}
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
