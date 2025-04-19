import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TrainerDashBoard.css";

const TrainerDashBoard = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:8090/api/trainers/get");
      setTrainers(response.data);
    } catch (error) {
      setError("Failed to fetch trainers");
    }

    setLoading(false);
  };

  return (
    <div className="page-wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">TrainerZone</div>
        <ul className="navbar-links">
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li>About</li>
        </ul>
      </nav>

      {/* Main Section */}
      <section className="main-section">
        <h2 className="section-title">Trainer Dashboard</h2>

        {loading && <p className="status-message">Loading trainers...</p>}
        {error && <p className="status-message error">{error}</p>}

        {!loading && trainers.length > 0 ? (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Specialization</th>
                </tr>
              </thead>
              <tbody>
                {trainers.map((trainer) => (
                  <tr key={trainer.id}>
                    <td>{trainer.id}</td>
                    <td>{trainer.firstName} {trainer.lastName}</td>
                    <td>{trainer.specialization}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && <p className="status-message">No trainers found.</p>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} TrainerZone. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TrainerDashBoard;
