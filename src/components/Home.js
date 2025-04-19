import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Home.css";

import gym2 from "./images/gym2.jpg";
import gym3 from "./images/gym3.jpg";
import gym4 from "./images/gym4.jpg";
import gym5 from "./images/gym5.jpg";
import gym6 from "./images/gym6.jpg";

function Home() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [gym2, gym3, gym4, gym5, gym6];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="home-container" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
      {/* Header */}
      <header className="header">
  <h1 className="gym-title">🏋️ Mansion Gym Club</h1>
  <p className="gym-subtitle">Unleash Your Inner Beast 💪</p>
</header>

      {/* Navbar */}
      <nav className="navbar">
        {/* <a href="#home">Home</a> */}
        <a href="#about">About</a>
        <button onClick={handleLogin}>Login</button>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <h2>Unleash Your Power</h2>
        <p>Transform your body and mind at Mansion Gym Club.</p>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2>About Us</h2>
        <p>
          Mansion Gym Club is your fitness destination for building strength, endurance, and community.
          We offer personalized training, nutrition advice, and modern equipment.
        </p>
      </section>

      {/* Footer */}
      <div className="footer">
  <div className="footer-content">
    <div className="footer-column">
      <h4>Membership</h4>
      <ul>
        <li><a href="#">Join Now</a></li>
        <li><a href="#">Member Login</a></li>
        <li><a href="#">Terms and Conditions</a></li>
        <li><a href="#">Code of Conduct</a></li>
      </ul>
    </div>

    <div className="footer-column">
      <h4>Gyms</h4>
      <ul>
        <li><a href="#">Find a Gym</a></li>
        <li><a href="#">Cheltenham</a></li>
        <li><a href="#">Swindon</a></li>
        <li><a href="#">Rotherham</a></li>
        <li><a href="#">Gateshead</a></li>
      </ul>
    </div>

    <div className="footer-column">
      <h4>Popular Links</h4>
      <ul>
        <li><a href="#">FAQ / Contact</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Group Training</a></li>
        <li><a href="#">Memberships for Businesses</a></li>
        <li><a href="#">Privacy & Cookie Policy</a></li>
      </ul>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© {new Date().getFullYear()} Mansion Gym Club. All rights reserved.</p>
  </div>
</div>

    </div>
  );
}

export default Home;
