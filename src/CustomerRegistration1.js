import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";

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
    });

    const [submittedCustomer, setSubmittedCustomer] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [showGetInfoButton, setShowGetInfoButton] = useState(false);  // New state

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!localStorage.getItem("username")) {
            navigate("/login");
        }
    }, [navigate]);

    // Handle input change
    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    // Handle form submission (POST request)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8090/api/customers/add", {
                ...customer,
                weight: parseFloat(customer.weight),
                age: parseInt(customer.age, 10),
                height: parseFloat(customer.height),
            });
            setMessage("Customer registered successfully!");
            setSubmittedCustomer(response.data);
        } catch (error) {
            setMessage("Error registering customer.");
            console.error(error);
        }
    };

    // Handle update request (PUT request)
    
    const handleUpdate = async () => {
        if (!submittedCustomer || !submittedCustomer.id) {
            setMessage("No customer found to update.");
            return;
        }
        try {
            const response = await axios.put(
                `http://localhost:8090/api/customers/update/${submittedCustomer.id}`,
                submittedCustomer
            );
            setMessage("Customer updated successfully!");
            setSubmittedCustomer(response.data);
            setShowGetInfoButton(true);  // Show the Get Info button after update

            const trainerResponse =await axios.put(
                `http://localhost:8090/api/customers/${submittedCustomer.id}/assign-trainer/${submittedCustomer.specialization}`
            );
            const assignedTrainer = trainerResponse.data.trainerName || "a trainer";
            setMessage(`Trainer assigned successfully: ${assignedTrainer}`);
        } catch (error) {
            setMessage("Error updating customer.");
            console.error(error);
        }
    };
    const handleGetInfo = () => {
        if (!submittedCustomer) return;
        const { age, height, weight, specialization } = submittedCustomer;
        const queryParams = new URLSearchParams({
            age: age || "",
            weight: weight || "",
            height: height || "",
            specialization: specialization || ""
        }).toString();
        window.location.href = `http://localhost:8090/api/customers/determine-page?${queryParams}`;
    };

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("username");
        // navigate("/login");
    };

    return (
        <div>
            <h2>Register Customer</h2>
            <button onClick={handleLogout} style={{ float: "right", margin: "10px" }}>Logout</button>
            {message && <p>{message}</p>}

            {!submittedCustomer ? (
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

                    <button type="submit">Register</button>
                </form>
            ) : (
                <div>
                    <h3>Submitted Customer Details</h3>
                    <form>
                    {Object.keys(submittedCustomer)
                        .filter((key) => key !== "trainerName") // Exclude trainerName
                        .map((key) => (
                            <div key={key}>
                                <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                                <input
                                    type="text"
                                    name={key}
                                    value={submittedCustomer[key]}
                                    onChange={(e) => setSubmittedCustomer({ ...submittedCustomer, [key]: e.target.value })}
                                />
                                <br />
                            </div>
                        ))}
                        <button type="button" onClick={handleUpdate} style={{ marginTop: "10px" }}>
                            Update
                        </button>

                        {showGetInfoButton && (
                            <button type="button" onClick={handleGetInfo} style={{ marginLeft: "10px" }}>
                                Get Info
                            </button>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
};

export default CustomerRegistration;
