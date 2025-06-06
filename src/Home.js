import React, { useState, useEffect,useRef } from 'react';
import { mockLocationData, mockPropertyTypes, mockRoomListings } from './mockData';
import SignUpModal from './SignupModal'; 
import RoomCard from './RoomCard'; 
import { removeLocalStorageItem } from './utils/localStorage';
import SettingsPanel from './SettingsPanel';

import { useNavigate } from 'react-router-dom';



const HomePage = ({setPropertyData,setShowHome}) => {
  const [userName, setUserName] = useState('');

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  const listingsRef = useRef(null)
  // Dummy user data for settings panel (in a real app, this would come from a user context or API)
  const [currentUserData, setCurrentUserData] = useState({
    fullName: 'John Doe',
    mobileNumber: '+91 9876543210',
    email: 'john.doe@example.com',
    address: '123 Main Street, Koramangala, Bengaluru, Karnataka, India',
  });

 

  // Filter States
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [propertyType, setPropertyType] = useState('Any');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');

  // Derived states for dropdown options
  const states = selectedCountry ? Object.keys(mockLocationData[selectedCountry]) : [];
  const cities = selectedState && selectedCountry ? mockLocationData[selectedCountry][selectedState] : [];

  // State to hold filtered listings (initially all listings)
  const [filteredListings, setFilteredListings] = useState(mockRoomListings);

  const navigate = useNavigate();
  
  // Reset state/city when country/state changes
  useEffect(() => {
    setSelectedState('');
    setSelectedCity('');
  }, [selectedCountry]);

  useEffect(() => {
    setSelectedCity('');
  }, [selectedState]);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };


  const handleSettingsClick = () => {
    setIsSettingsPanelOpen(true);
    setIsProfileDropdownOpen(false);
  };

  const handleHistoryClick = () => {
    alert('History clicked!');
    setIsProfileDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    alert('Logout clicked!');
    removeLocalStorageItem('userName')
    setUserName(''); // Clear the userName from component state immediately
    setIsProfileDropdownOpen(false);

    // Redirect to the login page after logout
    navigate('/');
  };

  const handleApplyFilters = () => {
    console.log('Applying Filters:', {
      selectedCountry,
      selectedState,
      selectedCity,
      propertyType,
      minPrice,
      maxPrice,
      bedrooms,
    });
    
    const newFilteredListings = mockRoomListings.filter(listing => {
      let matches = true;
      return matches;
    });

    setFilteredListings(newFilteredListings);

  // Scroll to the listings section after applying filters
  if (listingsRef.current) {
    listingsRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  alert('Filters applied! See updated listings below.');
  };

 

 


  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center relative z-10">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-purple-600">GoogleRent</a>
        </div>
        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Home</a></li>
            <li><a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Services</a></li>
          </ul>
         
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
                <a href="#" onClick={handleHistoryClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">History</a>
                <a href="#" onClick={handleLogoutClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section with Filters */}
      <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 md:p-12 text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Find Your Perfect Rental</h1>
        <p className="text-xl md:text-2xl mb-8">Discover properties tailored to your needs.</p>

        <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="country" className="block text-gray-700 text-sm font-semibold mb-2 text-left">Country</label>
            <select id="country" className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
              <option value="">Select Country</option>
              {Object.keys(mockLocationData).map((country) => (<option key={country} value={country}>{country}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="state" className="block text-gray-700 text-sm font-semibold mb-2 text-left">State</label>
            <select id="state" className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800" value={selectedState} onChange={(e) => setSelectedState(e.target.value)} disabled={!selectedCountry}>
              <option value="">Select State</option>
              {states.map((state) => (<option key={state} value={state}>{state}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block text-gray-700 text-sm font-semibold mb-2 text-left">City</label>
            <select id="city" className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
              <option value="">Select City</option>
              {cities.map((city) => (<option key={city} value={city}>{city}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="propertyType" className="block text-gray-700 text-sm font-semibold mb-2 text-left">Property Type</label>
            <select id="propertyType" className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
              {mockPropertyTypes.map((type) => (<option key={type} value={type}>{type}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="minPrice" className="block text-gray-700 text-sm font-semibold mb-2 text-left">Min Price</label>
            <input type="number" id="minPrice" className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800" placeholder="e.g., 500" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="maxPrice" className="block text-gray-700 text-sm font-semibold mb-2 text-left">Max Price</label>
            <input type="number" id="maxPrice" className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800" placeholder="e.g., 2000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="bedrooms" className="block text-gray-700 text-sm font-semibold mb-2 text-left">Bedrooms</label>
            <select id="bedrooms" className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
              <option value="">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4+">4+</option>
            </select>
          </div>
          <div className="md:col-span-2 lg:col-span-3 flex justify-center mt-4">
            <button onClick={handleApplyFilters} className="bg-purple-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-purple-700 transition duration-200 ease-in-out shadow-md w-full max-w-sm">
              Search Properties
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area - Display Room Cards */}
      <main className="p-8">
        {/* <h2 className="text-3xl font-bold text-gray-800 mb-6">Explore Listings</h2> */}
        <h2 ref={listingsRef} className="text-3xl font-bold text-gray-800 mb-6">Explore Listings</h2>

        
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((room) => (
              <RoomCard
              setShowHome = {setShowHome}
                setPropertyData = {setPropertyData}
                key={room.id}
                imageUrl={room.imageUrl}
                title={room.title}
                location={room.location}
                price={room.price}
                bedrooms={room.bedrooms}
                bathrooms={room.bathrooms}
                area={room.area}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center text-xl mt-10">No listings found matching your criteria. Try adjusting your filters!</p>
        )}
      </main>

      {/* Settings Side Panel */}
      <SettingsPanel
        isOpen={isSettingsPanelOpen}
        onClose={() => setIsSettingsPanelOpen(false)}
        initialData={currentUserData}
      />

    
    </div>
  );
};

export default HomePage;