import React, { useEffect, useState } from 'react';
import './HomeEventDetailPage.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HomeEventDetailPage = () => {
   const { id } = useParams(); // Getting event ID from the URL params
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch the event data based on the ID
    axios
      .get(`http://localhost:8084/api/events/getOneEvent/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error("Error fetching event details", err));
  }, [id]);

  if (!event) return <p>Loading event details...</p>;

  return (
    <div className="event-detail-container">
      <div className="event-image">
        {/* Full-size image */}
        <img src={event.imageUrl || "/default-image.jpg"} alt={event.title} />
      </div>
      <div className="event-details">
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <p><strong>Date & Time:</strong> {new Date(event.dateTime).toLocaleString()}</p>
        <p><strong>Category:</strong> {event.category?.name}</p>
        <p><strong>Venue:</strong> {event.venue?.name}</p>
      </div>
    </div>
  );
};

export default HomeEventDetailPage;
