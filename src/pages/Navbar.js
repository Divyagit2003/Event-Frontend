import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../pagesCss/Navbaar.css'; // Create this for custom styling


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Simulate login state check from localStorage or token
  useEffect(() => {
    const token = localStorage.getItem('token'); // or sessionStorage
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <div className="navbar-logo">EventMaster</div>

        <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`navbar-links ${isOpen ? 'show' : ''}`}>
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={toggleMenu}>About</Link></li>
          <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={toggleMenu}>Contact</Link></li>
          {/* <li><Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''} onClick={toggleMenu}>Profile</Link></li>*/}
          <li><Link to="/service" className={location.pathname === '/service' ? 'active' : ''} onClick={toggleMenu}>Service</Link></li>

          {!isLoggedIn ? (
            <li><Link to="/login" className={location.pathname === '/login' ? 'active' : ''} onClick={toggleMenu}>Login</Link></li>
          ) : (
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;