import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import gymHome from "./gym3.jpg"; // Import the image

function Home() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="home-container">
      <div className="overlay">
        <h1>Mansion Gym Club</h1>
        <div className="button-container">
          {/* <button className="button" onClick={handleRegister}>Register</button> */}
          <button className="button" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
