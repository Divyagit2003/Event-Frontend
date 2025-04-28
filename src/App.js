import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/AdminDashboard';
import OrganizerDashboard from './pages/OrganizerDashboard';
import AttendeeDashboard from './pages/AttendeeDashboard';
import AllEvents from './AdminPages/AllEvents';
import ManageCategories from './AdminPages/ManageCategories';
import ManageVenues from './AdminPages/ManageVenues';
import MyEvents from './OrganizerPages/MyEvents';
import CreateEvent from './OrganizerPages/CreateEvent';
import BrowseEvents from './AttendeePages/BrowseEvents';
import MyRegistrations from './AttendeePages/MyRegistrations';


function App() {
  return (
    <div>
      <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin Dashboards it's pages  */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AllEvents />} />
        <Route path="/admin/categories" element={<ManageCategories />} />
        <Route path="/admin/venues" element={<ManageVenues />} />

        {/* Organizer Dashboards it's pages  */}
        <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        <Route path="/organizer/allEvents" element={<MyEvents />} />
        <Route path="/organizer/events" element={<CreateEvent />} />


        {/* Attendee Dashboards it's pages  */}
        <Route path="/attendee-dashboard" element={<AttendeeDashboard />} />
        <Route path="/attendee/events" element={<BrowseEvents />} />
        <Route path="/attendee/registrations" element={<MyRegistrations />} />

        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
