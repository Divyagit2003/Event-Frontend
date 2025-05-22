import axios from 'axios';
import "./AttendeeData.css"; // Import your CSS file for styling
import React, { useEffect, useState } from 'react'

const AttendeeData = () => {
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

  useEffect(() => {
    fetchAllRegistrations();
  }, []);

  if (loading) return <p>Loading all registrations...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="org-attendee-data-container">
      <h2 className="org-attendee-data-title">All Event Registrations</h2>

      {attendees.length === 0 ? (
        <p className="org-attendee-data-empty">No registrations found.</p>
      ) : (
        <div className="org-attendee-data-grid">
          {attendees.map((attendee) => (
            <div key={attendee.id} className="org-attendee-data-card">
              {attendee.eventImage && (
                <img
                  src={`data:image/jpeg;base64,${attendee.eventImage}`}
                  alt="Event"
                  className="org-attendee-data-image"
                />
              )}

              <div className="org-attendee-data-content">
                <h3 className="org-attendee-data-event-title">{attendee.eventTitle}</h3>
                <p className="org-attendee-data-date"><strong>Date:</strong> {attendee.eventDate}</p>
                <p className="org-attendee-data-name"><strong>Name:</strong> {attendee.name}</p>
                <p className="org-attendee-data-email"><strong>Email:</strong> {attendee.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendeeData
