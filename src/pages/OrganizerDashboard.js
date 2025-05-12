import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../pagesCss/OrganizerDashboard.css';
import { FaCalendarCheck, FaPlusSquare, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

const OrganizerDashboard = () => {
  const [totalEvents, setTotalEvents] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState(0);

  const [venueName, setVenueName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8084/api/events/countEvents")
      .then(response => setTotalEvents(response.data))
      .catch(error => console.error("Error fetching total event count:", error));

    axios.get("http://localhost:8084/api/events/getAllEvents")
      .then(response => {
        const events = response.data;
        const todayDateOnly = new Date();
        todayDateOnly.setHours(0, 0, 0, 0);

        const upcoming = events.filter(event => new Date(event.date) >= todayDateOnly).length;
        setUpcomingEvents(upcoming);
      })
      .catch(error => console.error("Error fetching all events:", error));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    axios.get(`http://localhost:8084/api/events/search`, {
      params: {
        venueName,
        categoryName,
        title: eventTitle
      }
    })
    .then(response => {
      setFilteredEvents(response.data);
    })
    .catch(error => {
      console.error("Error fetching filtered events:", error);
      setFilteredEvents([]);
    });
  };

  return (
    <div className="organizer-dashboard">
      <aside className="sidebar">
        <h2 className="sidebar-title">Organizer</h2>
        <ul className="sidebar-menu">
          <li>
            <Link to="/organizer/allEvents">
              <FaCalendarCheck className="icon" />
              <span>My Events</span>
            </Link>
          </li>
          <li>
            <Link to="/organizer/events">
              <FaPlusSquare className="icon" />
              <span>Create Event</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <FaSignOutAlt className="icon" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <h1>Welcome, Organizer!</h1>
        <p>Use the side menu to manage and create your events.</p>

        <div className="dashboard-info">
          <div className="info-card">
            <h3>{totalEvents}</h3>
            <p>Total Events</p>
          </div>
          <div className="info-card">
            <h3>{upcomingEvents}</h3>
            <p>Upcoming Events</p>
          </div>
        </div>

        {/* Filter Section */}
        <section className="event-filter mt-5">
          <h3>Search Events</h3>
          <form onSubmit={handleSearch} className="filter-form">
            <input
              type="text"
              placeholder="Venue Name"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              required
            />
            <button type="submit">Search</button>
          </form>

          <div className="filtered-results mt-4">
            <h5>Filtered Events:</h5>
            {filteredEvents.length === 0 ? (
              <p>No events found.</p>
            ) : (
              <ul className="event-list">
                {filteredEvents.map(event => (
                  <li key={event.id} className="event-card">
                    <strong>{event.title}</strong><br />
                    <span>{new Date(event.dateTime).toLocaleString()}</span><br />
                    Venue: {event.venue?.name} | Category: {event.category?.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default OrganizerDashboard;
