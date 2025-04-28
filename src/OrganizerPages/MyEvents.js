import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyEvents = () => {
  const [events, setEvents] = useState(null); // Initial state as null to handle loading state

  useEffect(() => {
    // Fetch events when the component mounts
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8083/api/events/getAllEvents');
      setEvents(response.data); // Set the fetched data to state
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Handle the loading state before rendering events
  if (events === null) {
    return <div>Loading...</div>; // Show loading text while waiting for data
  }

  return (
    <div className="my-events-container">
      <h2>My Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>Date and Time: {new Date(event.dateTime).toLocaleString()}</p>
            {/* Check if venue and category are present before accessing their properties */}
            <p>Venue: {event.venue ? event.venue.name : 'Venue not available'}</p>
            <p>Category: {event.category ? event.category.name : 'Category not available'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyEvents;
