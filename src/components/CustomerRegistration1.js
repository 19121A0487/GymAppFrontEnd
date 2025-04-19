import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const CustomerRegistration = () => {
    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
        weight: "",
        gender: "",
        age: "",
        height: "",
        specialization: "",
        trainingPeriod: ""
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
        setCustomer({ ...customer, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (customer.address.trim() === "") {
            setMessage("Address cannot be empty or just spaces.");
            return;
        }
        
        try {
            const response = await axios.post("http://localhost:8090/api/customers/add", {
                ...customer,
                weight: parseFloat(customer.weight),
                age: parseInt(customer.age, 10),
                height: parseFloat(customer.height)
            });

            const newCustomerId = response.data.id;
            setMessage("Customer registered successfully!");
            navigate(`/edit-customer/${newCustomerId}`);

            setCustomer({
                firstName: "",
                lastName: "",
                address: "",
                phone: "",
                weight: "",
                gender: "",
                age: "",
                height: "",
                specialization: "",
                trainingPeriod: ""
            });

        } catch (error) {
            setMessage("Error registering customer.");
            console.error(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("username");
        navigate("/login");
    };

    return (
        <div>
            <h2>Register Customer</h2>
            <button onClick={handleLogout} style={{ float: "right", margin: "10px" }}>Logout</button>
            {message && <p>{message}</p>}

            <form onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input type="text" name="firstName" value={customer.firstName} onChange={handleChange} required />
                <br />

                <label>Last Name:</label>
                <input type="text" name="lastName" value={customer.lastName} onChange={handleChange} required />
                <br />

                <label>Address:</label>
                <input type="text" name="address" value={customer.address} onChange={handleChange} required />
                <br />

                <label>Phone:</label>
                <input type="text" name="phone" value={customer.phone} onChange={handleChange} required />
                <br />

                <label>Weight (kg):</label>
                <input type="number" name="weight" value={customer.weight} onChange={handleChange} required />
                <br />

                <label>Gender:</label>
                <select name="gender" value={customer.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <br />

                <label>Age:</label>
                <input type="number" name="age" value={customer.age} onChange={handleChange} required />
                <br />

                <label>Height (cm):</label>
                <input type="number" name="height" value={customer.height} onChange={handleChange} required />
                <br />

                <label>Specialization:</label>
                <select name="specialization" value={customer.specialization} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="Weight-Gain">Weight Gain</option>
                    <option value="Weight-Loss">Weight Loss</option>
                    <option value="Fitness">Fitness</option>
                </select>
                <br />

                <label>Training Period:</label>
                <select name="trainingPeriod" value={customer.trainingPeriod} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="12">12</option>
                </select>
                <br />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default CustomerRegistration;
