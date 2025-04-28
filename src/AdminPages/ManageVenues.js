import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageVenues.css';

const ManageVenues = () => {
  const [venues, setVenues] = useState([]);
  const [newVenue, setNewVenue] = useState({ name: '', location: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [venueId, setVenueId] = useState(null);

  // Fetch venues from backend
  useEffect(() => {
    axios.get('http://localhost:8083/api/venues/getAllVenues')
      .then(response => setVenues(response.data))
      .catch(error => console.error('Error fetching venues:', error));
  }, []);

  // Handle venue addition
  const handleAddVenue = () => {
    if (newVenue.name && newVenue.location) {
      axios.post('http://localhost:8083/api/venues/createVenue', 
        newVenue,
        {
          headers: {
            'Content-Type': 'application/json', // Ensure Content-Type is JSON
          },
        })
        .then(response => {
          setVenues([...venues, response.data]);
          setNewVenue({ name: '', location: '' });
        })
        .catch(error => console.error('Error adding venue:', error));
    }
  };

  // Handle venue deletion
  const handleDeleteVenue = (id) => {
    axios.delete(`http://localhost:8083/api/venues/deleteVenue/${id}`)
      .then(() => {
        setVenues(venues.filter(venue => venue.id !== id));
      })
      .catch(error => console.error('Error deleting venue:', error));
  };

  // Handle venue edit (optional)
  const handleEditVenue = (id, name, location) => {
    setIsEditing(true);
    setVenueId(id);
    setNewVenue({ name, location });
  };

  // Handle updating venue
  const handleUpdateVenue = () => {
    if (newVenue.name && newVenue.location && venueId !== null) {
      axios.put(`http://localhost:8083/api/venues/updateVenue/${venueId}`, newVenue)
        .then(response => {
          setVenues(venues.map(venue => 
            venue.id === venueId ? response.data : venue
          ));
          setIsEditing(false);
          setVenueId(null);
          setNewVenue({ name: '', location: '' });
        })
        .catch(error => console.error('Error updating venue:', error));
    }
  };

  return (
    <div className="manage-venues-container">
      <h2>Manage Venues</h2>
      <div>
        <input 
          type="text" 
          value={newVenue.name} 
          onChange={e => setNewVenue({ ...newVenue, name: e.target.value })} 
          placeholder="Venue Name" 
        />
        <input 
          type="text" 
          value={newVenue.location} 
          onChange={e => setNewVenue({ ...newVenue, location: e.target.value })} 
          placeholder="Venue Location" 
        />
        {isEditing ? (
          <button onClick={handleUpdateVenue}>Update Venue</button>
        ) : (
          <button onClick={handleAddVenue}>Add Venue</button>
        )}
      </div>
      <ul>
        {venues.map(venue => (
          <li key={venue.id}>
            {venue.name} - {venue.location}
            <button onClick={() => handleEditVenue(venue.id, venue.name, venue.location)}>Edit</button>
            <button onClick={() => handleDeleteVenue(venue.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageVenues;
