import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";  // Make sure this CSS is linked correctly

import gymLogin from "./images/gymLogin.jpg";
import gymLogin2 from "./images/gymLogin2.jpg";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8090/api/auth/login", credentials);
      if (response.data.message === "Login successful" && response.data.username === credentials.username) {
        localStorage.setItem("username", response.data.username);
        navigate("/dashboard");
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid username or password");
    }
  };

  return (
    <div className="login-wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form-title">Login</h2>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <div className="input-container">
          <input
            className="input-field"
            type="text"
            name="username"
            placeholder="Enter your username"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-container">
          <input
            className="input-field"
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />
        </div>

        <div className="forgot-password-container">
          <a className="forgot-password" href="#" style={{ color: "black", fontSize: "0.9em" }}>
            Forgot?
          </a>
        </div>

        <div className="btn">
          <button type="submit" className="submit">Login</button>
        </div>

        {/* <div className="btn social-buttons">
          <button type="button" className="google-button">Google</button>
          <button type="button" className="facebook-button">Facebook</button>
        </div> */}

        <div className="btn">
          <button type="button" className="signup-button">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
