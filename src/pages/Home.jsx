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
            The Future of
            <br />
            Next-Gen Chatbot
          </h1>
          <p>
            Meet Aidy, the next-generation AI chatbot designed to elevate
            conversations with intuitive responses, seamless integration, and
            powerful automation.
          </p>
          <div
            className="hero-buttons"
            style={{
              justifyContent: localStorage.getItem("token")
                ? "center"
                : undefined,
              display: "flex",
            }}
          >
            {!localStorage.getItem("token") && (
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            )}
            <Link to="/search" className="btn-secondary">
              Search
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Main Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faRobot} />
            </div>
            <h3>Advanced AI</h3>
            <p>
              Powered by advanced artificial intelligence for natural
              conversations and contextual awareness.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faLightbulb} />
            </div>
            <h3>Smart Learning</h3>
            <p>
              Continuously learns and adapts from interactions to provide more
              accurate and relevant responses.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faBolt} />
            </div>
            <h3>Quick Integration</h3>
            <p>
              Seamlessly integrates with existing systems and workflows with
              minimal setup time.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
            <h3>Security & Privacy</h3>
            <p>
              Enterprise-grade security with end-to-end encryption and data
              privacy compliance.
            </p>
          </div>
        </div>
      </section>
      <ChatButton />
    </div>
  );
}

export default Home;
