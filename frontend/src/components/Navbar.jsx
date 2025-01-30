import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import avatarImg from "../assets/avatar.png";
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';

export default function Navbar() {
  // Initialize Redux dispatch function
  const dispatch = useDispatch();
  // Access user information from Redux store
  const { user } = useSelector((state) => state.auth);
  // Initialize the navigate hook for navigation
  const navigate = useNavigate();
  // Initialize the logoutUser mutation hook
  const [logoutUser] = useLogoutUserMutation();

  // State for dropdown menu visibility
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // Function to toggle dropdown menu visibility
  const handDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap(); // Perform logout mutation
      dispatch(logout()); // Dispatch logout action to Redux store
      navigate('/'); // Navigate to the home page
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <header className='fixed-nav-bar w-nav'>
      <nav className='max-w-screen-2xl mx-auto px-4 flex justify-between items-center'>
        <ul className='nav__links'>
          <li className='link'><Link to="/">Home</Link></li>
          <li className='link'><Link to="/addCourse">Add Course</Link></li>
          <li className='link'><Link to="/viewCourses">View Course</Link></li>
        </ul>

        {/* Navigation icons */}
        <div className='nav__icons relative'>
          <span>
            {user ? (
              <>
                {/* User avatar image */}
                <img
                  onClick={handDropDownToggle}
                  src={user?.profileImage || avatarImg}
                  alt=""
                  className='size-6 rounded-full cursor-pointer'
                />
                {/* User name */}
                <p className='text-center text-sm text-gray-400'><small>{user?.username}</small></p>

                {/* Dropdown menu */}
                {isDropDownOpen && (
                  <div className='absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                    <ul className='font-medium space-y-4 p-2'>
                      <li><Link to="/profile" className='dropdown-items'>Profile</Link></li>
                      <li><Link onClick={handleLogout} className='dropdown-items'>Logout</Link></li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              // Link to login page if user is not logged in
              <Link to="/login">
                <i className="ri-user-line"></i>
              </Link>
            )}
          </span>
        </div>
      </nav>
    </header>
  );
}
