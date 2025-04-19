import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerList.css";

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
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
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
          // "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch customer details");
      }

      const customerData = await response.json();
      const queryParams = new URLSearchParams({
        age: customerData.age || "",
        weight: customerData.weight || "",
        height: customerData.height || "",
        specialization: customerData.specialization || "",
      }).toString();

      window.location.href = `http://localhost:8090/api/customers/determine-page?${queryParams}`;
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };

  return (
    <div className="page-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-brand">FitTrack</div>
        <ul className="navbar-links">
          <li onClick={() => navigate("/")}>Dashboard</li>
          <li onClick={() => navigate("/customers")}>Customers</li>
          <li onClick={() => navigate("/trainers")}>Trainers</li>
          <li onClick={() => navigate("/logout")}>Logout</li>
        </ul>
      </nav>

      {/* SECTION */}
      <main className="main-section">
        <h1>Customer List</h1>
        {loading && <p>Loading customers...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          <>
            <button onClick={fetchCustomers} className="refresh-button">Refresh List</button>
            <div className="table-wrapper">
              <table className="customer-table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Weight(kg)</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Height(cms)</th>
                    <th>Specialization</th>
                    <th>Period(mnths)</th>
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
                      <td>{customer.trainingPeriod}</td>
                      <td>{customer.trainerName || "Not Assigned"}</td>
                      <td>
                        <button onClick={() => handleEdit(customer.id)} className="edit-btn">Edit</button>
                        <button onClick={() => handleGetInfo(customer.id)} className="info-btn">Get Info</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h4>About Us</h4>
            <ul>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Partners</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:info@everlastgym.com">Email Us</a></li>
              <li><a href="#">Customer Support</a></li>
              <li><a href="#">Find a Gym</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Follow Us</h4>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Everlast Gym. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default CustomerList;
