import React from 'react';
import { Link } from "react-router-dom";
import '../pagesCss/AttendeeDashboard.css'; // Add your styles here

const AttendeeDashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Attendee Dashboard</h2>
      <ul className="dashboard-links">
        <li><Link to="/attendee/events">Browse Events</Link></li>
        <li><Link to="/attendee/registrations">My Registrations</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>
    </div>
  );
};

export default AttendeeDashboard;
