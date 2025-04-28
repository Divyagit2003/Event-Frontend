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

    fetch("http://localhost:8083/api/auth/signup", {
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
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <select name="role" required onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="ADMIN">Admin</option>
          <option value="ORGANIZER">Organizer</option>
          <option value="ATTENDEE">Attendee</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;
