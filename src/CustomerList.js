import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchCustomers();
    }
  }, []);
  

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:8090/api/customers/get", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include token if required
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }

      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (customerId) => {
    navigate(`/edit-customer/${customerId}`);
  };

  const handleGetInfo = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:8090/api/customers/get/${customerId}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch customer details");
      }
      

      const customerData = await response.json();

      // Extract relevant data for query parameters
      const queryParams = new URLSearchParams({
        age: customerData.age || "",
        weight: customerData.weight || "",
        height: customerData.height || "",
        specialization: customerData.specialization || ""
      }).toString();

      // Redirect with query parameters
      window.location.href = `http://localhost:8090/api/customers/determine-page?${queryParams}`;
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };

  return (
    <div className="container">
      <h1>Customer List</h1>
      {loading && <p>Loading customers...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <>
          <button onClick={fetchCustomers}>Refresh List</button>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Weight</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Height</th>
                <th>Specialization</th>
                <th>Trainer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.address}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.weight}</td>
                  <td>{customer.gender}</td>
                  <td>{customer.age}</td>
                  <td>{customer.height}</td>
                  <td>{customer.specialization}</td>
                  <td>{customer.trainerName || "Not Assigned"}</td>
                  <td>
                    <button onClick={() => handleEdit(customer.id)}>Edit</button>
                    <button onClick={() => handleGetInfo(customer.id)}>Get Info</button> 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default CustomerList;
