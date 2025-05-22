import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyRegistrations.css";

const MyRegistrations = () => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAllRegistrations = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8084/attendee/getAll");
      setAttendees(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch all registrations.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:8084/attendee/delete/${id}`);
      alert("Registration cancelled.");
      fetchAllRegistrations(); // Refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to cancel registration.");
    }
  };

  useEffect(() => {
    fetchAllRegistrations();
  }, []);

  if (loading) return <p>Loading all registrations...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="my-registrations-container">
      <h2>All Event Registrations</h2>

      {attendees.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        <div className="registration-grid">
          {attendees.map((attendee) => (
            <div key={attendee.id} className="registration-card">
              {attendee.eventImage && (
                <img
                  src={`data:image/jpeg;base64,${attendee.eventImage}`}
                  alt="Event"
                  className="event-image"
                />
              )}

              <div className="registration-content">
                <h3>{attendee.eventTitle}</h3>
                <p><strong>Date:</strong> {attendee.eventDate}</p>
                <p><strong>Name:</strong> {attendee.name}</p>
                <p><strong>Email:</strong> {attendee.email}</p>

                <button
                  onClick={() => handleCancel(attendee.id)}
                  className="cancel-button"
                >
                  Cancel Registration
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRegistrations;
