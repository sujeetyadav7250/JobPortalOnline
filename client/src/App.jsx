import { useContext } from 'react'; 
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ApplyJob from './pages/ApplyJob';
import Applications from './pages/Applications';
import RecruiterLogin from './components/RecruiterLogin';
import UserAuth from './components/UserAuth';
import { AppContext } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import ManageJobs from './pages/ManageJobs';
import ViewApplications from './pages/ViewApplications';
import ApplicationDetail from './pages/ApplicationDetail';
import UserProfile from './pages/UserProfile';
import Navbar from './components/Navbar';
import 'quill/dist/quill.snow.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { showRecruiterLogin, companyToken, showUserAuth, userToken } = useContext(AppContext);
  const location = useLocation();
  
  // Don't show the main Navbar on the Dashboard page and its subroutes
  const showNavbar = !location.pathname.includes('/dashboard');

  return (
    <>
      {showNavbar && <Navbar />}
      {showRecruiterLogin && <RecruiterLogin />}
      {showUserAuth && <UserAuth />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job/:id" element={<ApplyJob />} />
        <Route path="/apply/:id" element={<ApplyJob />} />
        
        {/* Protected User Routes */}
        {userToken && (
          <>
            <Route path="/applications" element={<Applications />} />
            <Route path="/profile" element={<UserProfile />} />
          </>
        )}
        
        {/* Protected Company Routes */}
        <Route path='/dashboard' element={<Dashboard />}>
          {companyToken ? (
            <>
              <Route path='add-job' element={<AddJob />} />
              <Route path='manage-jobs' element={<ManageJobs />} />
              <Route path='view-applications' element={<ViewApplications />} />
              <Route path='application/:applicationId' element={<ApplicationDetail />} />
            </>
          ) : null}
        </Route>
      </Routes>
    </>
  );
};

export default App;
