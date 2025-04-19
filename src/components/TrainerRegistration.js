import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const TrainerRegistration = () => {
    const [trainer, setTrainer] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        specialization: "",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("username")) {
            navigate("/login");
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrainer({ ...trainer, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8090/api/trainers/add", trainer);
            setMessage("Trainer registered successfully!");
            
            // Clear form
            setTrainer({
                firstName: "",
                lastName: "",
                phone: "",
                specialization: ""
            });

            // Optionally navigate to trainer list or edit page
            // navigate(`/edit-trainer/${response.data.id}`);
        } catch (error) {
            setMessage("Error registering trainer.");
            console.error(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("username");
        navigate("/login");
    };

    return (
        <div>
            <h2>Register Trainer</h2>
            <button onClick={handleLogout} style={{ float: "right", margin: "10px" }}>Logout</button>
            {message && <p>{message}</p>}

            <form onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input type="text" name="firstName" value={trainer.firstName} onChange={handleChange} required />
                <br />

                <label>Last Name:</label>
                <input type="text" name="lastName" value={trainer.lastName} onChange={handleChange} required />
                <br />

                <label>Phone:</label>
                <input type="text" name="phone" value={trainer.phone} onChange={handleChange} required />
                <br />

                <label>Specialization:</label>
                <select name="specialization" value={trainer.specialization} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="Weight-Gain">Weight Gain</option>
                    <option value="Weight-Loss">Weight Loss</option>
                    <option value="Fitness">Fitness</option>
                </select>
                <br />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default TrainerRegistration;
