import { useNavigate, Link } from "react-router-dom";

import { useState, useContext } from "react";

import React from "react";

import SettingsPanel from "./SettingsPanel"; // <--- Assuming SettingsPanel is also directly in 'src'

import { removeLocalStorageItem } from "./utils/localStorage"; // Path to utils/localStorage is correct relative to 'src'

import ScrollContext from "./contexts/ScrollContext"; // Import your new context

const Navbar = () => {
  const { scrollToFooter } = useContext(ScrollContext); // Consume scrollToFooter from context

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  const [userName, setUserName] = useState('');



  const [currentUserData, setCurrentUserData] = useState({

    fullName: 'John Doe',

    mobileNumber: '+91 9876543210',

    email: 'john.doe@example.com',

    address: '123 Main Street, Koramangala, Bengaluru, Karnataka, India',

  });



  const handleSettingsClick = () => {

    setIsSettingsPanelOpen(true);

    setIsProfileDropdownOpen(false);

  };

  const navigate = useNavigate();



  const handleLogoutClick = () => {

    alert('Logout clicked!');

    removeLocalStorageItem('userName')

    setUserName('');

    setIsProfileDropdownOpen(false);


    navigate('/');

  };



  const toggleProfileDropdown = () => {

    setIsProfileDropdownOpen(!isProfileDropdownOpen);

  };

  
  // Handle the About Us click
  const handleAboutUsClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    if (scrollToFooter) { // Ensure scrollToFooter exists before calling
      scrollToFooter();
    }
  };


  return (

    <nav className="bg-white p-4 shadow-md flex justify-between items-center relative z-10">

      <div className="flex items-center">

        <Link to="/home" className="text-2xl font-bold text-purple-600">Google Rent</Link>

      </div>


      <div className="flex items-center space-x-6">

        <Link to="/home" className="hover:text-blue-200 font-medium hidden sm:block">Home</Link>
        <Link to="/services" className="hover:text-blue-200 font-medium hidden sm:block">Services</Link>

        {/* <Link to="/showproperty" className="hover:text-blue-200 font-medium hidden sm:block">Properties</Link> */}

        {/* <Link to="/itemdetails" className="hover:text-blue-200 font-medium hidden sm:block">My Listings</Link> */}


        {/* About Us link using onClick */}
        <a href="#about-us" onClick={handleAboutUsClick} className="hover:text-blue-200 font-medium hidden sm:block">About Us</a>




        <div className="relative ml-4">

          <button onClick={toggleProfileDropdown} className="flex items-center space-x-2 focus:outline-none" aria-expanded={isProfileDropdownOpen} aria-haspopup="true">

            <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-800 font-bold border-2 border-purple-400">

              JD

            </div>

            <span className="text-black font-medium hidden md:block">John Doe</span>

            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>

            </svg>

          </button>

          {isProfileDropdownOpen && (

            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">

              <a href="#" onClick={handleSettingsClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>

              <Link to="/showproperty" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Show Properties</Link>

              <a href="#" onClick={handleLogoutClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>

            </div>

          )}

        </div>

      </div>


      <SettingsPanel

        isOpen={isSettingsPanelOpen}

        onClose={() => setIsSettingsPanelOpen(false)}

        initialData={currentUserData}

      />

    </nav>

  )

}

export default Navbar