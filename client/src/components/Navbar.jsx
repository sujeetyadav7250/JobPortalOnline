import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate(); 
  const { 
    setShowRecruiterLogin, 
    setShowUserAuth, 
    userData, 
    userToken, 
    logoutUser 
  } = useContext(AppContext);

  return (
    <div className='py-4 shadow'>
      <div className='container flex items-center justify-between px-4 mx-auto 2xl:px-20'>
        <img 
          onClick={() => navigate('/')} 
          className='cursor-pointer' 
          src={assets.logo} 
          alt="Logo" 
        />
        
        {userToken && userData ? (
          <div className='flex items-center gap-3'>
            <Link to={'/applications'}>Applied jobs</Link>
            <p>|</p>
            <p className='max-sm:hidden'>Hi, {userData?.name}</p>
            <div className="relative group">
              <img 
                src={userData?.image} 
                alt={userData?.name} 
                className="w-10 h-10 rounded-full cursor-pointer object-cover"
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button 
                  onClick={logoutUser} 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex gap-4 max-sm:text-xs'>
            <button 
              onClick={() => setShowRecruiterLogin(true)} 
              className='text-gray-600'
            >
              Recruiter Login
            </button>
            <button 
              onClick={() => setShowUserAuth(true)} 
              className='px-6 py-2 text-white bg-blue-600 rounded-full sm:px-9'
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;