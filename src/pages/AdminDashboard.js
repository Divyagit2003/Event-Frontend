import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/admin/events">All Events</Link></li>
        <li><Link to="/admin/categories">Manage Categories</Link></li>
        <li><Link to="/admin/venues">Manage Venues</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
