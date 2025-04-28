import React, { useState, useEffect } from "react";
import axios from "axios";
import './MyRegistrations.css'; // Your custom styling here

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch registrations from backend
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get("http://localhost:8083/api/attendee/registrations");
        setRegistrations(response.data);
      } catch (error) {
        setError("Error fetching registrations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="my-registrations-container">
      <h2>My Registrations</h2>
      <ul className="registration-list">
        {registrations.map((registration) => (
          <li key={registration.id} className="registration-item">
            <h3>{registration.eventName}</h3>
            <p>{registration.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRegistrations;
