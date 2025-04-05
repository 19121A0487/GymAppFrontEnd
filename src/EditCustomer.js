import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const fetchCustomerDetails = () => {
    setLoading(true);
    fetch(`http://localhost:8090/api/customers/get/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch customer data");
        return response.json();
      })
      .then((data) => {
        setCustomer(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCustomerDetails();
  }, [id]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!customer?.firstName) errors.firstName = "First name is required";
    if (!customer?.lastName) errors.lastName = "Last name is required";
    if (!customer?.address) errors.address = "Address is required";
    
    if (!customer?.phone || !/^\d{10}$/.test(customer.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }
    if (customer?.age <= 0 || customer?.age > 120) errors.age = "Age must be between 1 and 120";
    if (!customer?.weight || isNaN(parseFloat(customer.weight))) {
      errors.weight = "Weight must be a valid number";
    } else if (customer.weight < 30 || customer.weight > 200) {
      errors.weight = "Weight must be between 30 and 200 kg";
    }   
    if (!customer?.height || isNaN(customer.height) || customer.height < 50 || customer.height > 200) {
      errors.height = "Height must be between 50 and 200 cm";
    }
    if (customer?.specialization.length < 3) errors.specialization = "Specialization must be at least 3 characters long";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    fetch(`http://localhost:8090/api/customers/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => response.json())
      .then((updatedCustomer) => {
        alert("Customer updated successfully!");
        setCustomer(updatedCustomer); // Update state to reflect changes
      })
      .catch((error) => console.error("Error updating customer:", error));
  };

  if (loading) return <p>Loading customer details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container">
      <h1>Edit Customer</h1>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" name="firstName" value={customer?.firstName || ""} onChange={handleChange} required />
        {validationErrors.firstName && <p style={{ color: "red" }}>{validationErrors.firstName}</p>}

        <label>Last Name:</label>
        <input type="text" name="lastName" value={customer?.lastName || ""} onChange={handleChange} required />
        {validationErrors.lastName && <p style={{ color: "red" }}>{validationErrors.lastName}</p>}

        <label>Address:</label>
        <input type="text" name="address" value={customer?.address || ""} onChange={handleChange} required />
        {validationErrors.address && <p style={{ color: "red" }}>{validationErrors.address}</p>}

        <label>Phone:</label>
        <input type="text" name="phone" value={customer?.phone || ""} onChange={handleChange} required />
        {validationErrors.phone && <p style={{ color: "red" }}>{validationErrors.phone}</p>}

        <label>Weight:</label>
        <input type="text" name="weight" value={customer?.weight || ""} onChange={handleChange} required />
        {validationErrors.weight && <p style={{ color: "red" }}>{validationErrors.weight}</p>}

        <label>Gender:</label>
        <select name="gender" value={customer?.gender || "Male"} onChange={handleChange} required>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Age:</label>
        <input type="number" name="age" value={customer?.age || ""} onChange={handleChange} required />
        {validationErrors.age && <p style={{ color: "red" }}>{validationErrors.age}</p>}

        <label>Height:</label>
        <input type="text" name="height" value={customer?.height || ""} onChange={handleChange} required />
        {validationErrors.height && <p style={{ color: "red" }}>{validationErrors.height}</p>}

        <label>Specialization:</label>
        <select name="specialization" value={customer?.specialization || ""} onChange={handleChange} required>
          <option value="Weight-Gain">Weight-Gain</option>
          <option value="Weight-Loss">Weight-Loss</option>
          <option value="Fitness">Fitness</option>
        </select>
        {/* <input type="text" name="specialization" value={customer?.specialization || ""} onChange={handleChange} required /> */}
        {validationErrors.specialization && <p style={{ color: "red" }}>{validationErrors.specialization}</p>}

        <button type="submit">Update Customer</button>
      </form>
    </div>
  );
}

export default EditCustomer;