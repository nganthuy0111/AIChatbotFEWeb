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
    { id: "all", label: "All", color: "primary" },
    { id: "student-rights", label: "Student Rights", color: "secondary" },
    { id: "teacher-rights", label: "Teacher Rights", color: "success" },
    { id: "school-management", label: "School Management", color: "info" },
    { id: "curriculum", label: "Curriculum", color: "warning" },
    { id: "discipline", label: "Discipline", color: "error" },
  ];

  const handleSearch = () => {
    // Simulate search results for education law
    const mockResults = [
      {
        id: 1,
        title: "The Rights and Obligations of Students under the Education Law",
        category: "Student Rights",
        description:
          "Article 34 of the Education Law stipulates that students have the right to be educated and to learn in order to develop holistically, and have the obligation to learn and practice according to the curriculum...",
        date: "2023-12-15",
        relevance: 95,
        lawReference: "Education Law - Article 34",
      },
      {
        id: 2,
        title: "Regulations on Discipline for Students in Schools",
        category: "Discipline",
        description:
          "Regulation 32/2020/TT-BGDDT stipulates on discipline for students, including various forms of discipline and procedures for handling violations...",
        date: "2023-12-10",
        relevance: 88,
        lawReference: "Regulation 32/2020/TT-BGDDT",
      },
      {
        id: 3,
        title: "The Rights and Obligations of Teachers",
        category: "Teacher Rights",
        description:
          "Article 70 of the Education Law stipulates that teachers have the right to be trained, developed, and enjoy salaries and other benefits...",
        date: "2023-12-08",
        relevance: 82,
        lawReference: "Education Law - Article 70",
      },
      {
        id: 4,
        title: "Regulations on the Secondary Education Curriculum",
        category: "Curriculum",
        description:
          "Regulation 32/2018/TT-BGDĐT issued a new secondary education curriculum, effective from the 2020-2021 academic year...",
        date: "2023-12-05",
        relevance: 78,
        lawReference: "Regulation 32/2018/TT-BGDĐT",
      },
      {
        id: 5,
        title: "Regulations on Financial Management in Schools",
        category: "School Management",
        description:
          "Resolution 86/2015/NĐ-CP stipulated on the mechanism for collecting, managing school fees for educational establishments under the national education system...",
        date: "2023-12-03",
        relevance: 75,
        lawReference: "Resolution 86/2015/NĐ-CP",
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
              Search Education Law
            </Typography>
          </Box>
          <Typography
            variant="h6"
            color="text.secondary"
            className="search-subtitle"
          >
            Search for legal information about education quickly and accurately
          </Typography>
        </Box>

        <Paper elevation={3} className="search-container">
          <Box className="search-input-section">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter keywords to search education law..."
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
                      Search
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
                Filter by category:
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
                Search results ({searchResults.length})
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
                            label={`${result.relevance}% match`}
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
                              Updated:{" "}
                              {new Date(result.date).toLocaleDateString(
                                "en-US"
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
                            View details
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
                No results found for "{searchQuery}"
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Try different keywords or check your spelling
              </Typography>
            </Box>
          )}
        </Paper>

        <Box className="search-tips" sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Effective search tips:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    🔍 Use precise keywords
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enter important keywords like "student", "teacher",
                    "discipline" for more accurate results
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    📋 Filter by category
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Select the appropriate category to narrow your search in the
                    education field
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
