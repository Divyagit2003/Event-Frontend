import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../pagesCss/SignUp.css';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8084/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (res.ok) {
          alert("Sign-up successful!");
          navigate("/login");
        } else {
          alert("Signup failed");
        }
      })
      .catch(error => {
        console.error("Signup error:", error);
        alert("Error occurred during signup");
      });
  };

  return (
    <div className="signup-page">
      <div className="signup-form-box">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} className="signup-input" />
          <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} className="signup-input" />
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} className="signup-input" />
          <select name="role" required onChange={handleChange} className="signup-input">
            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="ORGANIZER">Organizer</option>
            <option value="ATTENDEE">Attendee</option>
          </select>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <p className="signup-footer-text">Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
};

export default Signup;
