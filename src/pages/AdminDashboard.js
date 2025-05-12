import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../pagesCss/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>👑 Admin Panel</h2>
        <ul>
          <li><Link to="/admin/events">All Events</Link></li>
          <li><Link to="/admin/categories">Manage Categories</Link></li>
          <li><Link to="/admin/venues">Manage Venues</Link></li>
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        </ul>
      </aside>

      <main className="admin-content">
        <h1>Welcome, Admin</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
