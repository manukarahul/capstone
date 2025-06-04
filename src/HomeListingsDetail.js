// src/components/HomeListingDetail.jsx
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const HomeListingDetail = ({setShowHome, propertyData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const listing = {
    "title": "Modern 3-Bedroom Apartment in Downtown",
    "location": "123 Main Street, Downtown City, NY 10001",
    "price": 3500,
    "bedrooms": 3,
    "bathrooms": 2,
    "area": 1200,
    "description": "Spacious and sunlit apartment located in the heart of downtown. Features modern design, large windows, and a private balcony. Perfect for families or working professionals.",
    "images": [
      "https://plus.unsplash.com/premium_photo-1669083827853-de7a75b6daa9?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1748024093647-bbbfbe2c0c3f?q=80&w=2497&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    "amenities": [
      "Air Conditioning",
      "Washer/Dryer",
      "Elevator",
      "Gym",
      "Pet Friendly",
      "24/7 Security",
      "Parking Garage"
    ],
    "ownerDetails": {
      "name": "Jane Doe",
      "contactNumber": "+1-555-123-4567",
      "email": "jane.doe@example.com"
    },
    "ownerPreferences": {
      "preferredTenants": "Working professionals or families",
      "minimumLeaseTermMonths": 12,
      "petsAllowed": true,
      "smokingAllowed": false
    }
  }
  
  if (!listing) {
    return <div className="text-center p-8 text-gray-700">Listing not found.</div>;
  }

  const {
    images,
    title,
    location,
    price,
    bedrooms,
    bathrooms,
    area,
    description,
    amenities,
    ownerDetails,
    ownerPreferences,
  } = listing;

  const mainImageUrl = images[currentImageIndex];

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  // const navigate = useNavigate();
  
  // Helper function for owner preferences display
  const renderPreference = (condition, text, icon) => {
    if (condition) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mr-2 mb-2">
          {icon && <span className="mr-1 text-base">{icon}</span>}
          {text}
        </span>
      );
    }
    return null;
  };

  return (
    
    <div className="container mx-auto p-4 md:p-8 bg-white rounded-lg shadow-xl mt-4 max-w-4xl"> {/* Added max-w-4xl for better readability */}

      <button
        
        className="mb-6 flex items-center text-purple-600 hover:text-purple-800 font-semibold transition-colors duration-200"
        onClick={() => {setShowHome(true)}}
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Listings
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Image Gallery and Description */}
        <div className="flex flex-col">
          <div className="relative w-full h-80 sm:h-96 bg-gray-200 rounded-lg overflow-hidden mb-4 shadow-md"> {/* Adjusted height for better fit */}
            <img
              src={mainImageUrl}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src="https://dummyimage.com/800x600/E0BBE4/FFFFFF&text=Image+Not+Available"; }}
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10"
                >
                  &lt;
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10"
                >
                  &gt;
                </button>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex flex-wrap gap-2 justify-center mb-6"> {/* Added mb-6 to create space below thumbnails */}
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${"no image"} thumbnail ${index + 1}`}
                  className={`w-16 h-12 md:w-20 md:h-16 object-cover rounded-md cursor-pointer border-2 ${
                    index === currentImageIndex ? 'border-purple-600' : 'border-transparent'
                  } hover:border-purple-600 transition-all duration-200`}
                  onClick={() => handleThumbnailClick(index)}
                  onError={(e) => { e.target.onerror = null; e.target.src="https://dummyimage.com/100x80/D3D3D3/000&text=NA"; }}
                />
              ))}
            </div>
          )}

          {/* Description below images */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Description</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{description}</p>
        </div>

        {/* Right Column: Room Details, Amenities, Preferences, Contact */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-xl text-purple-700 font-semibold mb-4">{price} <span className="text-gray-600 text-sm">/month</span></p>
          <p className="text-gray-600 text-lg mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
            </svg>
            {location}
          </p>

          <hr className="my-4"/>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-800 text-md mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a1 1 0 00-1 1v1h2V3a1 1 0 00-1-1zm-.414 4.121L7.707 7.707a1 1 0 001.414 1.414L10 7.414l.879.879a1 1 0 101.414-1.414L10.414 6.121a1 1 0 00-1.414 0zM17 11H3a1 1 0 00-1 1v5a1 1 0 001 1h14a1 1 0 001-1v-5a1 1 0 00-1-1zM4 13h12v3H4v-3z"></path>
              </svg>
              {bedrooms} Bedrooms
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M14.707 9.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 112 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
              {bathrooms} Bathrooms
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
              {area} sqft
            </div>
          </div>

          {amenities && amenities.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Amenities</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {amenities.map((amenity, index) => (
                  <span key={index} className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-800">
                    {amenity}
                  </span>
                ))}
              </div>
            </>
          )}

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Owner Preferences</h2>
          <div className="flex flex-wrap mb-6">
            {renderPreference(ownerPreferences.gymFreak, 'Gym Freak', '🏋️‍♂️')}
            {renderPreference(ownerPreferences.petLover, 'Pet Lover', '🐾')}
            {renderPreference(ownerPreferences.smokerFriendly, 'Smoker Friendly', '🚬')}
            {/* Display veg/non-veg preference unconditionally as it's always one or the other */}
            {renderPreference(true, ownerPreferences.vegNonVeg, ownerPreferences.vegNonVeg === 'Vegetarian' ? '🥕' : '🍗')}
          </div>

          <hr className="my-4"/>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Contact Owner</h2>
          <div className="bg-blue-50 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <p className="text-gray-800 font-semibold text-lg">{ownerDetails.name}</p>
              <p className="text-gray-700">Email: {ownerDetails.email}</p>
              <p className="text-gray-700">Phone: {ownerDetails.phone}</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <a
                href={`tel:${ownerDetails.phone}`}
                className="bg-green-500 text-white px-5 py-2 rounded-md font-semibold hover:bg-green-600 transition duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.037 11.037 0 006.103 6.103l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                Call Now
              </a>
              <a
                href={`mailto:${ownerDetails.email}`}
                className="bg-blue-500 text-white px-5 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeListingDetail;