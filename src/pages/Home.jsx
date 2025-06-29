import React from "react";
import "./Home.css";
import HeaderUser from "../components/user-components/HeaderUser";
import ChatButton from "../components/ChatButton";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faLightbulb,
  faBolt,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

library.add(faRobot, faLightbulb, faBolt, faShieldHalved);

function Home() {
  return (
    <div className="home-container">
      <HeaderUser />
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Tương lai của
            <br />
            Chatbot Thế hệ Mới
          </h1>
          <p>
            Gặp gỡ Aidy, chatbot AI thế hệ mới được thiết kế để nâng cao cuộc
            trò chuyện với phản hồi trực quan, tích hợp liền mạch và tự động hóa
            mạnh mẽ.
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="btn-primary">
              Đăng nhập
            </Link>
            <Link to="/search" className="btn-secondary">
              Tra cứu
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Tính năng chính</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faRobot} />
            </div>
            <h3>AI Tiên tiến</h3>
            <p>
              Được hỗ trợ bởi trí tuệ nhân tạo tiên tiến cho các cuộc trò chuyện
              tự nhiên và nhận thức ngữ cảnh.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faLightbulb} />
            </div>
            <h3>Học tập thông minh</h3>
            <p>
              Liên tục học hỏi và thích ứng từ các tương tác để cung cấp phản
              hồi chính xác và liên quan hơn.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faBolt} />
            </div>
            <h3>Tích hợp nhanh</h3>
            <p>
              Tích hợp liền mạch với các hệ thống và quy trình làm việc hiện có
              với thời gian thiết lập tối thiểu.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
            <h3>Bảo mật & Riêng tư</h3>
            <p>
              Bảo mật cấp doanh nghiệp với mã hóa end-to-end và tuân thủ quyền
              riêng tư dữ liệu.
            </p>
          </div>
        </div>
      </section>
      <ChatButton />
    </div>
  );
}

export default Home;
