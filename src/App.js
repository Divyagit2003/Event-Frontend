import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import EventDetails from './AdminPages/EventDetails';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import EventRegistration from './AttendeePages/EventRegistration';
import About from './pages/About';
import Success from './AfterRagisterpage/Success';
import Service from './NewPage/Service';



function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
  
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact />} />
       {/* <Route path="/profile" element={<Profile />} />*/}
        <Route path="/service" element={<Service />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin Dashboards it's pages  */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AllEvents />} />
        <Route path="/events/:id" element={<EventDetails/>} /> {/* Add this route */}
        <Route path="/admin/categories" element={<ManageCategories />} />
        <Route path="/admin/venues" element={<ManageVenues />} />

        {/* Organizer Dashboards it's pages  */}
        <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        <Route path="/organizer/allEvents" element={<MyEvents />} />
        <Route path="/organizer/events" element={<CreateEvent />} />


        {/* Attendee Dashboards it's pages  */}
        <Route path="/attendee-dashboard" element={<AttendeeDashboard />} />
        <Route path="/attendee/events" element={<BrowseEvents />} />
        <Route path="/attendee/register/:id" element={<EventRegistration/>} />
        <Route path="/success" element={<Success/>} />
        <Route path="/attendee/registrations" element={<MyRegistrations />} />

        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
