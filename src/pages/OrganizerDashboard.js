import { Link } from "react-router-dom";

const OrganizerDashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Organizer Dashboard</h2>
      <ul>
        <li><Link to="/organizer/allEvents">My Events</Link></li>
        <li><Link to="/organizer/events">Create Event</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>
    </div>
  );
};
export default OrganizerDashboard;
