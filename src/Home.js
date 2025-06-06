
import React, { useState, useEffect,useRef } from 'react';
import { mockLocationData, mockPropertyTypes, mockRoomListings } from './mockData';
import RoomCard from './RoomCard'; 
import SettingsPanel from './SettingsPanel';
import AddPropertyModal from './AddPropertyModal.js';
import Navbar from './Navbar.js';
 
  
  const HomePage = ({setPropertyData,setShowHome}) => {
    
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [isAddPropertyModalOpen,setIsAddPropertyModalOpen] = useState(false)
  const listingsRef = useRef(null)
  // Dummy user data for settings panel (in a real app, this would come from a user context or API)
  

 

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

                                 
  
  // Reset state/city when country/state changes
  useEffect(() => {
    setSelectedState('');
    setSelectedCity('');
  }, [selectedCountry]);

  useEffect(() => {
    setSelectedCity('');
  }, [selectedState]);


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
    {/* Navbar - Stays at the top */}
    <Navbar/>
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 md:p-12 text-center shadow-lg">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Find Your Perfect Rental</h1>
      <p className="text-xl md:text-2xl mb-8">Discover properties tailored to your needs.</p>
    </div>
    {/* --- */}
    {/* New Split Section: Add Property (Left) and Filters (Right) */}
    <div className="p-8 flex flex-col md:flex-row gap-8">
      {/* Left Half: Add Property Button with Logo */}
      <div className="md:w-1/3 flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Want to list your property?</h3>
        <button 
          onClick={() => setIsAddPropertyModalOpen(true)} // You'd typically link this to opening your modal
          className="bg-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700 transition duration-200 ease-in-out shadow-md flex items-center justify-center space-x-2 w-full max-w-xs"
          >
          {/* Small Plus Logo/Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>Add Property</span>
        </button>
        <p className="text-gray-600 text-sm mt-4 text-center">
          List your rental property quickly and easily to connect with potential tenants.
        </p>
      </div>
  
      {/* Right Half: Filter Section */}
      <div className="md:w-2/3 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Filter Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="country" className="block text-gray-700 text-sm font-semibold mb-2 text-left">Country</label>
            <select id="country" className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
              <option value="">Select Country</option>
              {/* Ensure mockLocationData is defined and accessible */}
              {Object.keys(mockLocationData).map((country) => (<option key={country} value={country}>{country}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="state" className="block text-gray-700 text-sm font-semibold mb-2 text-left">State</label>
            <select id="state" className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800" value={selectedState} onChange={(e) => setSelectedState(e.target.value)} disabled={!selectedCountry}>
              <option value="">Select State</option>
              {/* Ensure states is derived from selectedCountry */}
              {states.map((state) => (<option key={state} value={state}>{state}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block text-gray-700 text-sm font-semibold mb-2 text-left">City</label>
            <select id="city" className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
              <option value="">Select City</option>
              {/* Ensure cities is derived from selectedState */}
              {cities.map((city) => (<option key={city} value={city}>{city}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="propertyType" className="block text-gray-700 text-sm font-semibold mb-2 text-left">Property Type</label>
            <select id="propertyType" className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
              {/* Ensure mockPropertyTypes is defined */}
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
      </div>
    </div>
  
    {/* --- */}
    {/* Main Content Area - Display Room Cards */}
    <main className="p-8">
      <h2 ref={listingsRef} className="text-3xl font-bold text-gray-800 mb-6">Explore Listings</h2>
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((room) => (
            <RoomCard
            setShowHome={setShowHome}
            setPropertyData={setPropertyData}
            room={room} 
            key={room.id}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center text-xl mt-10">No listings found matching your criteria. Try adjusting your filters!</p>
      )}
    </main>
  
  <AddPropertyModal isOpen={isAddPropertyModalOpen} onClose={setIsAddPropertyModalOpen}/>
  </div>
  );
}

export default HomePage