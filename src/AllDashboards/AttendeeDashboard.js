import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../AllDashboards/AttendeeDashboard.css";

const AttendeeDashboard = () => {
  const [events, setEvents] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchDate, setSearchDate] = useState("");

  // Fetch all events on load
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:8084/api/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to load all events", err);
      }
    };
    fetchEvents();
  }, []);

  // Search by event title
  const searchByTitle = async () => {
    if (!searchTitle.trim()) return;
    try {
      const res = await axios.get(
        "http://localhost:8084/api/events/search/title",
        {
          params: { title: searchTitle.trim() },
        }
      );
      console.log("Fetched events by title:", res.data);
      setEvents(res.data);
    } catch (err) {
      console.error("❌ Failed to search by title", err);
      alert("Error while searching for events by title.");
    }
  };

  // Search by date
  const searchByDate = async () => {
    if (!searchDate) return;
    try {
      const res = await axios.get("http://localhost:8084/events/search/date", {
        params: { date: searchDate },
      });
      console.log("Fetched events by date:", res.data);
      setEvents(res.data);
    } catch (err) {
      console.error("❌ Failed to search by date", err);
      alert("Error while searching for events by date.");
    }
  };

  return (
    <div className="attendee-dashboard sidebar-layout">
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <Link to="/attendee/events" className="sidebar-link">
            Browse Events
          </Link>
          <Link to="/attendee/registrations" className="sidebar-link">
            My Registrations
          </Link>
          <Link to="/" className="sidebar-link logout-link">
            Logout
          </Link>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <h2>Welcome, Attendee!</h2>
          <p>Choose an option from the sidebar or search events below.</p>
        </div>

        <div className="search-section">
          <input
            type="text"
            placeholder="Search by event title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <button onClick={searchByTitle}>Search Title</button>

          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <button onClick={searchByDate}>Search Date</button>
        </div>

        <div className="attendee-events-list">
  {events.length > 0 ? (
    events.map((event) => (
      <div key={event.id} className="attendee-event-card">
        {event.imageData && (
          <img
            src={`data:image/jpeg;base64,${event.imageData}`}
            alt="Event"
            className="attendee-event-image"
          />
        )}
        <div className="attendee-event-content">
          <h3 className="attendee-event-title">{event.title}</h3>
          <p className="attendee-event-info">
            <strong>Date:</strong> {new Date(event.dateTime).toLocaleString()}
          </p>
          <p className="attendee-event-info">
            <strong>Venue:</strong> {event.venue?.name}
          </p>
          <p className="attendee-event-info">
            <strong>Category:</strong> {event.category?.name}
          </p>
        </div>
      </div>
    ))
  ) : (
    <p>No events found.</p>
  )}
</div>

      </main>
    </div>
  );
};

export default AttendeeDashboard;
