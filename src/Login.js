import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8090/api/auth/login", credentials);
    
            console.log("Response Data:", response.data);  // Debugging
    
            // Check if the message confirms login success
            if (response.data.message === "Login successful" && response.data.username === credentials.username) {
                localStorage.setItem("username", response.data.username);
                setIsLoggedIn(true);
                
            } else {
                throw new Error("Invalid username or password");
            }
        } catch (error) {
            console.error("Login Error:", error.response ? error.response.data : error.message);
            setError(error.response?.data?.message || "Invalid username or password");
        }
    };
    

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!isLoggedIn ? (
                <form onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input type="text" name="username" onChange={handleChange} required />
                    <br />
                    <label>Password:</label>
                    <input type="password" name="password" onChange={handleChange} required />
                    <br />
                    <button type="submit">Login</button>
                </form>
            ) : (
                <div>
                    <button onClick={() => navigate("/customerList")}>View Customer List</button>
                    <button onClick={() => navigate("/customer-registration")}>Register Customer</button>
                    <button onClick={() => navigate("/trainers")}>Trainers</button>  
                </div>
            )}
        </div>
    );
};

export default Login;
