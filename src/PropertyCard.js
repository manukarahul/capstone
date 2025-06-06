import React from 'react';

const PropertyCard = ({ property, onEdit, onDelete }) => {
  return (
    <div className="
      border border-gray-200 rounded-lg overflow-hidden shadow-lg m-4
      w-full md:w-80 flex flex-col bg-white transform transition-transform
      hover:scale-105 duration-300 ease-in-out
    ">
      {property.imageUrl && (
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{property.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
          {property.description}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-700 mb-4">
          <span className="font-bold text-green-600">₹{property.price.toLocaleString()}</span>
          <span className="text-gray-500">{property.location}</span>
        </div>
        <div className="flex gap-3 mt-auto">
          {onEdit && (
            <button
              className="
                flex-1 px-4 py-2 rounded-md
                bg-pink-600 text-white font-medium
                hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                transition-colors duration-200 ease-in-out
              "
              onClick={() => onEdit(property)} // Pass the whole property object
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              className="
                flex-1 px-4 py-2 rounded-md
                bg-purple-600 text-white font-medium
                hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                transition-colors duration-200 ease-in-out
              "
              onClick={() => onDelete(property.id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;