import React, { useEffect, useState } from 'react';
import '../pagesCss/Home.css';
import axios from 'axios';
import Footer from '../NewPage/Footer';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Replace with actual Spring Boot API later
    axios.get('http://localhost:8084/api/events/getAllEvents')
      .then(res => setEvents(res.data))
      .catch(err => console.error('Error fetching events', err));
  }, []);

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="slider">
          <img src="/assests/event1.jpg" />
          <div className="overlay-text">
            <h1>Welcome to EventMaster</h1>
            <p>Organize, manage, and enjoy your events with ease!</p>
          </div>
        </div>
      </section>

      <section className="event-section">
        <h2>Upcoming Events</h2>
        <div className="card-container">
          {events.map(event => (
            <div className="event-card" key={event.id}>
             <img src="/assests/event2.jpg" />
              <div className="card-content">
                <h3>{event.title}</h3>
                <span>{new Date(event.dateTime).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Home;

