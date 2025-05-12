import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateEvent.css';
import { useNavigate } from 'react-router-dom'; // Import navigation

const CreateEvent = () => {
  const [categories, setCategories] = useState([]);
  const [venues, setVenues] = useState([]);
  const [eventData, setEventData] = useState({
    title: '',
    dateTime: '',
    venue: '',
    category: ''
  });

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    axios.get('http://localhost:8084/api/categories/getAllCategories')
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error fetching categories:", err));

    axios.get('http://localhost:8084/api/venues/getAllVenues')
      .then(res => setVenues(res.data))
      .catch(err => console.error("Error fetching venues:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventToSend = {
      title: eventData.title,
      dateTime: eventData.dateTime,
      category: { id: eventData.category },
      venue: { id: eventData.venue }
    };

    axios.post('http://localhost:8084/api/events/createEvent', eventToSend)
      .then(() => {
        alert("Event added successfully!");
        navigate('/organizer/allEvents'); // Redirect to MyEvents page
      })
      .catch(err => console.error("Error adding event:", err));
  };

  return (
    <div className="create-event-container">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={eventData.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Date & Time</label>
          <input type="datetime-local" name="dateTime" value={eventData.dateTime} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Venue</label>
          <select name="venue" value={eventData.venue} onChange={handleChange} required>
            <option value="">-- Select Venue --</option>
            {venues.map(venue => (
              <option key={venue.id} value={venue.id}>{venue.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={eventData.category} onChange={handleChange} required>
            <option value="">-- Select Category --</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">Add Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
