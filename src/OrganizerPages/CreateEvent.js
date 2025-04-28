import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateEvent = () => {
 const [categories, setCategories] = useState([]);
   const [venues, setVenues] = useState([]);
   const [eventData, setEventData] = useState({
     title: '',
     dateTime: '',
     venue: '',
     category: ''
   });
 
   useEffect(() => {
     // Fetch Categories
     axios.get('http://localhost:8083/api/categories/getAllCategories')
       .then(res => {
         console.log("Fetched categories:", res.data);
         setCategories(res.data);
       })
       .catch(err => console.error("Error fetching categories:", err));
 
     // Fetch Venues
     axios.get('http://localhost:8083/api/venues/getAllVenues')
       .then(res => {
         console.log("Fetched venues:", res.data);
         setVenues(res.data);
       })
       .catch(err => console.error("Error fetching venues:", err));
   }, []);
 
   const handleChange = (e) => {
     const { name, value } = e.target;
     setEventData(prev => ({ ...prev, [name]: value }));
   };
 
   const handleSubmit = (e) => {
     e.preventDefault();
 
     // Convert dateTime to ISO format for submission
     const eventToSend = {
       title: eventData.title,
       dateTime: eventData.dateTime,  // Assuming it's already in a valid date-time format
       category: {
         id: eventData.category
       },
       venue: {
         id: eventData.venue
       }
     };
 
     axios.post('http://localhost:8083/api/events/createEvent', eventToSend)
       .then(res => {
         alert("Event added successfully!");
         setEventData({ title: '', dateTime: '', venue: '', category: '' });
       })
       .catch(err => console.error("Error adding event:", err));
   };
 
   return (
     <div className="container mt-4">
       <h3>Add Event</h3>
       <form onSubmit={handleSubmit}>
         <div className="form-group mb-2">
           <label>Title</label>
           <input className="form-control" type="text" name="title" value={eventData.title} onChange={handleChange} required />
         </div>
         
         <div className="form-group mb-2">
           <label>Date & Time</label>
           <input
             className="form-control"
             type="datetime-local"
             name="dateTime"
             value={eventData.dateTime}
             onChange={handleChange}
             required
           />
         </div>
 
         <div className="form-group mb-2">
           <label>Venue</label>
           <select className="form-select" name="venue" value={eventData.venue} onChange={handleChange} required>
             <option value="">-- Select Venue --</option>
             {venues.map(venue => (
               <option key={venue.id} value={venue.id}>{venue.name}</option>
             ))}
           </select>
         </div>
 
         <div className="form-group mb-2">
           <label>Category</label>
           <select className="form-select" name="category" value={eventData.category} onChange={handleChange} required>
             <option value="">-- Select Category --</option>
             {categories.map(cat => (
               <option key={cat.id} value={cat.id}>{cat.name}</option>
             ))}
           </select>
         </div>
 
         <button className="btn btn-primary mt-3" type="submit">Add Event</button>
       </form>
     </div>
   );
 };

export default CreateEvent;
