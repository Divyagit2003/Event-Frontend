import React from 'react';
import { Link } from "react-router-dom";
import '../pagesCss/AttendeeDashboard.css';

const AttendeeDashboard = () => {
  return (
    <div className="attendee-dashboard">
      <div className="dashboard-header">
        <h2>Welcome, Attendee!</h2>
        <p>Choose what you'd like to do:</p>
      </div>

      <div className="dashboard-cards">
        <Link to="/attendee/events" className="dashboard-card">
          <h3>Browse Events</h3>
          <p>Explore and register for available events.</p>
        </Link>

        <Link to="/attendee/registrations" className="dashboard-card">
          <h3>My Registrations</h3>
          <p>View or cancel your event registrations.</p>
        </Link>

        <Link to="/" className="dashboard-card logout-card">
          <h3>Logout</h3>
          <p>Return to login screen.</p>
        </Link>
      </div>
    </div>
  );
};

export default AttendeeDashboard;
