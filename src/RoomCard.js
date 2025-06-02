// src/components/RoomCard.jsx
import React from 'react';

const RoomCard = ({ imageUrl, title, location, price, bedrooms, bathrooms, area }) => {
  // Uses the imageUrl prop directly. If it's undefined/null, it defaults to the first fallback.
  const finalImageUrl = imageUrl || "https://dummyimage.com/600x400/DCCFEF/7C3AED&text=Room+Image+Default";

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Room Photo */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-200">
        <img
          src={finalImageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => { e.target.onerror = null; e.target.src="https://dummyimage.com/600x400/E0BBE4/FFFFFF&text=Image+Load+Error"; }} // Fallback if dummy fails
        />
        <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          For Rent
        </div>
      </div>

      {/* Room Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{title}</h3>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
          </svg>
          {location}
        </p>

        <div className="flex items-baseline mb-3">
          <span className="text-2xl font-bold text-purple-700">{price}</span>
          <span className="text-sm text-gray-500 ml-1">/month</span>
        </div>

        <div className="flex justify-between items-center text-gray-700 text-sm">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2a1 1 0 00-1 1v1h2V3a1 1 0 00-1-1zm-.414 4.121L7.707 7.707a1 1 0 001.414 1.414L10 7.414l.879.879a1 1 0 101.414-1.414L10.414 6.121a1 1 0 00-1.414 0zM17 11H3a1 1 0 00-1 1v5a1 1 0 001 1h14a1 1 0 001-1v-5a1 1 0 00-1-1zM4 13h12v3H4v-3z"></path>
            </svg>
            {bedrooms} Beds
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M14.707 9.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 112 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
            {bathrooms} Baths
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
            </svg>
            {area} sqft
          </div>
        </div>

        <button className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-purple-700 transition duration-200">
          View Details
        </button>
      </div>
    </div>
  );
};

export default RoomCard;