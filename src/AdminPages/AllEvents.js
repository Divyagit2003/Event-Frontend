import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllEvents.css';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

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

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8084/api/events/deleteEvents/${eventId}`);
      alert("Event deleted successfully!");
      fetchEvents(); // Refresh list
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updated = {
        id: editingEvent.id,
        title: editingEvent.title,
        dateTime: editingEvent.dateTime,
        category: { id: editingEvent.category.id },
        venue: { id: editingEvent.venue.id }
      };
      await axios.put(`http://localhost:8084/api/events/updateEvents/${editingEvent.id}`, updated);
      alert("Event updated successfully!");
      setEditingEvent(null);
      fetchEvents();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  if (!events.length) return <div className="loading">Loading...</div>;

  return (
    <div className="my-events-container">
      <h2 className="header">My Events</h2>
      <div className="card-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            {event.imageData && (
              <img
                src={`data:image/jpeg;base64,${event.imageData}`}
                alt="Event"
                className="event-image"
              />
            )}
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {new Date(event.dateTime).toLocaleString()}</p>
            <p><strong>Venue:</strong> {event.venue?.name || 'N/A'}</p>
            <p><strong>Category:</strong> {event.category?.name || 'N/A'}</p>
            <div className="btn-group">
              <button className="btn-edit" onClick={() => handleEdit(event)}>Edit</button>
              <button className="btn-delete" onClick={() => deleteEvent(event.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingEvent && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <h3>Edit Event</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="title"
                value={editingEvent.title}
                onChange={handleEditChange}
                required
              />
              <input
                type="datetime-local"
                name="dateTime"
                value={editingEvent.dateTime}
                onChange={handleEditChange}
                required
              />
              <button type="submit">Update</button>
              <button className="btn-cancel" onClick={() => setEditingEvent(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
