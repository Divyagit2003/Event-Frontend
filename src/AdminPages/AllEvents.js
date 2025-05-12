import React, { useState, useEffect } from 'react';
import './AllEvents.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // to navigate to event details page

const AllEvents = () => {
  const [events, setEvents] = useState(null); 
  const navigate = useNavigate(); // to navigate to view page

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8084/api/events/getAllEvents');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8084/api/events/deleteEvents/${id}`);
      alert('Event deleted successfully');
      fetchEvents(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    }
  };

  const handleView = (id) => {
    navigate(`/events/${id}`); // Navigate to event details page (you must configure this route separately)
  };

  if (events === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-events-container">
      <h2>All Events</h2>
      <ul className="events-list">
        {events.map((event) => (
          <li key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>Date and Time: {new Date(event.dateTime).toLocaleString()}</p>
            <p>Venue: {event.venue ? event.venue.name : 'Venue not available'}</p>
            <p>Category: {event.category ? event.category.name : 'Category not available'}</p>
            <div className="event-buttons">
              <button onClick={() => handleView(event.id)} className="view-button">View</button>
              <button onClick={() => handleDelete(event.id)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllEvents;
