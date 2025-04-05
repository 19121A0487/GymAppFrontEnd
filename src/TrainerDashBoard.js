import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css"

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
    <div>
      <h2>Trainer Dashboard</h2>
      <button onClick={() => navigate("/")}>Back to Home</button>

      {loading && <p>Loading trainers...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && trainers.length > 0 ? (
        <table>
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
      ) : (
        !loading && <p>No trainers found.</p>
      )}
    </div>
  );
};

export default TrainerDashBoard;
