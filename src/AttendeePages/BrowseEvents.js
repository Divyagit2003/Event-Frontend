import React, { useState, useEffect } from "react";
import axios from "axios";
import './BrowseEvents.css'; // Your custom styling here

const BrowseEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8083/api/events/getAllEvents");
        setEvents(response.data);
      } catch (error) {
        setError("Error fetching events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="browse-events-container">
      <h2>Browse Events</h2>
      <ul className="event-list">
        {events.map((event) => (
          <li key={event.id} className="event-item">
            <h3>{event.name}</h3>
            <p>{event.date}</p>
            <button>Register</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrowseEvents;
