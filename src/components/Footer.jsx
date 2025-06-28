import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
  Divider,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";
import "./Footer.css";

const Footer = () => {
  return (
    <Box className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Contact Section */}
          <Grid item xs={12} md={4}>
            <Box className="footer-section">
              <Typography variant="h6" className="footer-title">
                Liên hệ với chúng tôi
              </Typography>
              <Box className="contact-info">
                <Box className="contact-item">
                  <LocationOn />
                  <Typography variant="body2">
                    Đại học FPT, Long Thạnh Mỹ, Thành phố Thủ Đức, TP.HCM
                  </Typography>
                </Box>
                <Box className="contact-item">
                  <Email />
                  <Typography variant="body2">support@edulawai.com</Typography>
                </Box>
                <Box className="contact-item">
                  <Phone />
                  <Typography variant="body2">+84 906 834 024</Typography>
                </Box>
              </Box>
              <Box className="social-links">
                <IconButton className="social-icon">
                  <Facebook />
                </IconButton>
                <IconButton className="social-icon">
                  <Twitter />
                </IconButton>
                <IconButton className="social-icon">
                  <LinkedIn />
                </IconButton>
                <IconButton className="social-icon">
                  <Instagram />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider className="footer-divider" />

        <Box className="footer-bottom">
          <Typography variant="body2" className="copyright">
            © {new Date().getFullYear()} EduLawAI. Tất cả quyền được bảo lưu.
          </Typography>
          <Box className="legal-links">
            <Link href="/privacy">Chính sách bảo mật</Link>
            <Link href="/terms">Điều khoản dịch vụ</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
