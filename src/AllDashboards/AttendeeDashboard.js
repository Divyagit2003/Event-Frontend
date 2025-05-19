import React from 'react';
import { Link } from "react-router-dom";
import '../AllDashboards/AttendeeDashboard.css';

const AttendeeDashboard = () => {
  return (
    <div className="attendee-dashboard sidebar-layout">
      <aside className="sidebar">
        <h2 className="sidebar-title">Attendee Menu</h2>
        <nav className="sidebar-nav">
          <Link to="/attendee/events" className="sidebar-link">Browse Events</Link>
          <Link to="/attendee/registrations" className="sidebar-link">My Registrations</Link>
          <Link to="/" className="sidebar-link logout-link">Logout</Link>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <h2>Welcome, Attendee!</h2>
          <p>Choose an option from the sidebar.</p>
        </div>
      </main>
    </div>
  );
};

export default AttendeeDashboard;
