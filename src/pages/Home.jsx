import HeaderUser from "../components/user-components/HeaderUser";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <HeaderUser />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>EduLawAI - Smart Education Law Assistant</h1>
          <p>
            Your intelligent companion for quick and accurate education law
            consultation
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Law Search</h3>
            <p>
              Easily search and navigate through education laws and regulations
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Smart Consultation</h3>
            <p>
              Get expert guidance from AI trained specifically in education law
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Response</h3>
            <p>Receive immediate answers and legal guidance</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Always Updated</h3>
            <p>
              Stay current with the latest education law updates and regulations
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
