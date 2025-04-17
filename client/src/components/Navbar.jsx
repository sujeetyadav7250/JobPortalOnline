import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom"; // ✅ Added useNavigate import
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate(); 

  const {setShowRecruiterLogin} = useContext(AppContext)

  return (
    <div className='py-4 shadow'>
      <div className='container flex items-center justify-between px-4 mx-auto 2xl:px-20'>
        <img 
          onClick={() => navigate('/')} 
          className='cursor-pointer' 
          src={assets.logo} 
          alt="Logo" 
        />
        {user ? (
          <div className='flex items-center gap-3'>
            <Link to={'/applications'}>Applied jobs</Link>
            <p>|</p>
            <p className='max-sm:hidden'>Hi, {user?.firstName} {user?.lastName}</p> {/* ✅ Added optional chaining */}
            <UserButton />
          </div>
        ) : (
          <div className='flex gap-4 max-sm:text-xs'>
            <button onClick={e=> setShowRecruiterLogin(true)}className='text-gray-600'>Recruiter Login</button>
            <button 
              onClick={() => openSignIn()} 
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