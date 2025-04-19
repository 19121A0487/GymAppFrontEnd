import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./PaymentDetails.css";

function PaymentDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [error, setError] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const trainingPeriod = location.state?.trainingPeriod || 3;
  const couponCode = location.state?.couponCode || "";
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    fetch(
      `http://localhost:8090/api/prices/calculate?trainingPeriod=${trainingPeriod}&couponCode=${couponCode}&customerId=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized or error fetching data");
        return res.json();
      })
      .then((data) => {
        setPaymentInfo(data);
      })
      .catch((err) => {
        console.error("Error fetching payment info:", err);
        setError("Failed to load payment details");
      });

    fetch(`http://localhost:8090/api/customers/get/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching customer data");
        return res.json();
      })
      .then((data) => setCustomerData(data))
      .catch((err) => {
        console.error("Error fetching customer info:", err);
        setError("Failed to load customer details");
      });
  }, [id, trainingPeriod, couponCode]);

  return (
    <div>
      <nav className="navbar">
        <div className="nav-left">
          <h1>FitTrack</h1>
          <ul className="nav-links">
            <li><a href="/home">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/customerList">Customers</a></li>
            <li><a href="/trainers">Trainers</a></li>
          </ul>
        </div>
      </nav>

      {/* Main Section */}
      <div className="container">
        <h2>Payment Summary</h2>

        {error && <p className="error">{error}</p>}

        {paymentInfo && customerData ? (
          <div className="payment-info">
            <p><span>Name:</span> {customerData.firstName}</p>
            <p><span>Phone:</span> {customerData.phone}</p>
            <p><span>Training Period:</span> {customerData.trainingPeriod} months</p>

            <p><span>Base Price:</span> ₹{paymentInfo.basePrice}</p>
            <p><span>Coupon Discount:</span> ₹{paymentInfo.couponDiscount}</p>
            <h3>Final Price: ₹{paymentInfo.finalPrice}</h3>

            <div className="button-wrapper">
              <button className="payment-button">Proceed to Payment</button>
            </div>
          </div>
        ) : (
          !error && <p className="loading">Loading payment details...</p>
        )}
      </div>

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

export default PaymentDetails;
