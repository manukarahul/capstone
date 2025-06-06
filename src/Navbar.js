import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import SettingsPanel from "./SettingsPanel";
import { removeLocalStorageItem } from "./utils/localStorage";
const Navbar = () =>
{
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
    const [userName,setUserName] = useState('');


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
        setUserName(''); // Clear the userName from component state immediately
        setIsProfileDropdownOpen(false);
    
        // Redirect to the login page after logout
        navigate('/');
      };

      const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
      };
    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center relative z-10">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-purple-600">GoogleRent</a>
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <button onClick={toggleProfileDropdown} className="flex items-center space-x-2 focus:outline-none" aria-expanded={isProfileDropdownOpen} aria-haspopup="true">
              <img src="https://placehold.co/40x40/CFCBFC/5046E5?text=JD" alt="Profile" className="w-10 h-10 rounded-full border-2 border-purple-400 object-cover"/>
              <span className="text-gray-800 font-medium hidden md:block">John Doe</span>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <a href="#" onClick={handleSettingsClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                <a href="showproperty"  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">show properties</a>
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