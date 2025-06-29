import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Chip,
  Divider,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SchoolIcon from "@mui/icons-material/School";
import HeaderUser from "../components/user-components/HeaderUser";
import "./Search.css";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchResults, setSearchResults] = useState([]);

  const categories = [
    { id: "all", label: "Tất cả", color: "primary" },
    { id: "student-rights", label: "Quyền học sinh", color: "secondary" },
    { id: "teacher-rights", label: "Quyền giáo viên", color: "success" },
    { id: "school-management", label: "Quản lý trường học", color: "info" },
    { id: "curriculum", label: "Chương trình giảng dạy", color: "warning" },
    { id: "discipline", label: "Kỷ luật học đường", color: "error" },
  ];

  const handleSearch = () => {
    // Simulate search results for education law
    const mockResults = [
      {
        id: 1,
        title: "Quyền và nghĩa vụ của học sinh theo Luật Giáo dục",
        category: "Quyền học sinh",
        description:
          "Điều 34 Luật Giáo dục quy định học sinh có quyền được giáo dục, học tập để phát triển toàn diện và có nghĩa vụ học tập, rèn luyện theo chương trình...",
        date: "2023-12-15",
        relevance: 95,
        lawReference: "Luật Giáo dục - Điều 34",
      },
      {
        id: 2,
        title: "Quy định về kỷ luật học sinh trong trường học",
        category: "Kỷ luật học đường",
        description:
          "Thông tư 32/2020/TT-BGDĐT quy định về kỷ luật học sinh, bao gồm các hình thức kỷ luật và quy trình xử lý vi phạm...",
        date: "2023-12-10",
        relevance: 88,
        lawReference: "Thông tư 32/2020/TT-BGDĐT",
      },
      {
        id: 3,
        title: "Quyền và nghĩa vụ của giáo viên",
        category: "Quyền giáo viên",
        description:
          "Điều 70 Luật Giáo dục quy định giáo viên có quyền được đào tạo, bồi dưỡng nâng cao trình độ, được hưởng lương và các chế độ khác...",
        date: "2023-12-08",
        relevance: 82,
        lawReference: "Luật Giáo dục - Điều 70",
      },
      {
        id: 4,
        title: "Quy định về chương trình giáo dục phổ thông",
        category: "Chương trình giảng dạy",
        description:
          "Thông tư 32/2018/TT-BGDĐT ban hành chương trình giáo dục phổ thông mới, áp dụng từ năm học 2020-2021...",
        date: "2023-12-05",
        relevance: 78,
        lawReference: "Thông tư 32/2018/TT-BGDĐT",
      },
      {
        id: 5,
        title: "Quy định về quản lý tài chính trong trường học",
        category: "Quản lý trường học",
        description:
          "Nghị định 86/2015/NĐ-CP quy định về cơ chế thu, quản lý học phí đối với cơ sở giáo dục thuộc hệ thống giáo dục quốc dân...",
        date: "2023-12-03",
        relevance: 75,
        lawReference: "Nghị định 86/2015/NĐ-CP",
      },
    ];
    setSearchResults(mockResults);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-page">
      <HeaderUser />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box className="search-header">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <SchoolIcon sx={{ fontSize: 48, mr: 2, color: "#cdff09" }} />
            <Typography variant="h3" component="h1" className="search-title">
              Tra cứu Pháp luật Giáo dục
            </Typography>
          </Box>
          <Typography
            variant="h6"
            color="text.secondary"
            className="search-subtitle"
          >
            Tìm kiếm thông tin pháp lý về giáo dục nhanh chóng và chính xác
          </Typography>
        </Box>

        <Paper elevation={3} className="search-container">
          <Box className="search-input-section">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Nhập từ khóa tìm kiếm pháp luật giáo dục..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      onClick={handleSearch}
                      sx={{
                        ml: 1,
                        background: "#cdff09",
                        color: "#181818",
                        "&:hover": {
                          background: "#b8e600",
                        },
                      }}
                    >
                      Tìm kiếm
                    </Button>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Box className="category-filters">
              <Typography
                variant="h6"
                sx={{ mb: 2, display: "flex", alignItems: "center" }}
              >
                <FilterListIcon sx={{ mr: 1 }} />
                Lọc theo chủ đề:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {categories.map((category) => (
                  <Chip
                    key={category.id}
                    label={category.label}
                    color={
                      selectedCategory === category.id
                        ? category.color
                        : "default"
                    }
                    onClick={() => setSelectedCategory(category.id)}
                    clickable
                    variant={
                      selectedCategory === category.id ? "filled" : "outlined"
                    }
                    sx={{
                      "&.MuiChip-filled": {
                        background: "#cdff09",
                        color: "#181818",
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          {searchResults.length > 0 && (
            <Box className="search-results">
              <Typography variant="h5" sx={{ mb: 3 }}>
                Kết quả tìm kiếm ({searchResults.length})
              </Typography>

              <Grid container spacing={3}>
                {searchResults.map((result) => (
                  <Grid item xs={12} key={result.id}>
                    <Card className="result-card" elevation={2}>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            mb: 2,
                          }}
                        >
                          <Typography
                            variant="h6"
                            component="h3"
                            className="result-title"
                          >
                            {result.title}
                          </Typography>
                          <Chip
                            label={`${result.relevance}% phù hợp`}
                            color="success"
                            size="small"
                          />
                        </Box>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          {result.description}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}
                          >
                            <Chip
                              label={result.category}
                              size="small"
                              variant="outlined"
                              sx={{ borderColor: "#cdff09", color: "#cdff09" }}
                            />
                            <Chip
                              label={result.lawReference}
                              size="small"
                              variant="outlined"
                              sx={{ borderColor: "#666", color: "#666" }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Cập nhật:{" "}
                              {new Date(result.date).toLocaleDateString(
                                "vi-VN"
                              )}
                            </Typography>
                          </Box>

                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              borderColor: "#cdff09",
                              color: "#cdff09",
                              "&:hover": {
                                borderColor: "#b8e600",
                                background: "rgba(205, 255, 9, 0.1)",
                              },
                            }}
                          >
                            Xem chi tiết
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {searchQuery && searchResults.length === 0 && (
            <Box className="no-results">
              <Typography
                variant="h6"
                color="text.secondary"
                textAlign="center"
              >
                Không tìm thấy kết quả nào cho "{searchQuery}"
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Hãy thử với từ khóa khác hoặc kiểm tra lại chính tả
              </Typography>
            </Box>
          )}
        </Paper>

        <Box className="search-tips" sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Mẹo tìm kiếm hiệu quả:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    🔍 Sử dụng từ khóa chính xác
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Nhập các từ khóa quan trọng như "học sinh", "giáo viên", "kỷ
                    luật" để có kết quả chính xác hơn
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    📋 Lọc theo chủ đề
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Chọn chủ đề phù hợp để thu hẹp phạm vi tìm kiếm trong lĩnh
                    vực giáo dục
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Search;
