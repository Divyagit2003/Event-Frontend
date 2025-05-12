import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8084/api/events/getOneEvent/${id}`)
      .then((response) => setEvent(response.data))
      .catch((error) => {
        console.error('Error fetching event:', error);
        alert('Failed to load event details.');
      });
  }, [id]);

  if (!event) return <div className="loading">Loading event details...</div>;

  return (
    <div className="event-details-container">
      <div className="event-details-card animated-card">
    
        <div className="card-body">
          <h2 className="event-title">{event.title}</h2>
          <p><strong>📅 Date & Time:</strong> {new Date(event.dateTime).toLocaleString()}</p>
          <p><strong>📍 Venue:</strong> {event.venue?.name || 'Not specified'}</p>
          <p><strong>🏷 Category:</strong> {event.category?.name || 'Not specified'}</p>
          <p><strong>📝 Description:</strong> {event.description || 'No description available'}</p>
          <button onClick={() => navigate('/admin/events')} className="back-button">
            ⬅ Back to Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
