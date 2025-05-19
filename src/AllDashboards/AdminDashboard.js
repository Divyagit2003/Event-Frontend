import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../AllDashboards/AdminDashboard.css';
import AllEvents from '../AdminPages/AllEvents';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
    
        <ul>
          
          <li><Link to="/admin/events">All Events</Link></li>
          <li><Link to="/admin/categories">Manage Categories</Link></li>
          <li><Link to="/admin/venues">Manage Venues</Link></li>
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        </ul>
      </aside>

      <main className="admin-content">
        <h1>Welcome, Admin</h1>
      </main>
    </div>
  );
};

export default AdminDashboard;
