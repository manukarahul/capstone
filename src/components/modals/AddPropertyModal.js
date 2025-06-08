// src/components/modals/AddPropertyModal.js
import React, { useState, useMemo } from 'react';
import { mockLocationData } from '../../data/mockData'; // Updated path

const AddPropertyModal = ({ isOpen, onClose, onAddPropertySubmit }) => {
  const [price, setPrice] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [listingType, setListingType] = useState('rent');
  const [images, setImages] = useState([]);

  // Memoized lists for states and cities based on selections
  const states = useMemo(() => {
    return selectedCountry && mockLocationData[selectedCountry]
      ? Object.keys(mockLocationData[selectedCountry])
      : [];
  }, [selectedCountry]); // No need to include mockLocationData in dependency array if it's static

  const cities = useMemo(() => {
    return selectedCountry && selectedState && mockLocationData[selectedCountry] && mockLocationData[selectedCountry][selectedState]
      ? mockLocationData[selectedCountry][selectedState]
      : [];
  }, [selectedCountry, selectedState]); // No need to include mockLocationData in dependency array if it's static

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!price || !propertyType || !selectedCountry || !selectedState || !selectedCity || !bedrooms || !listingType || images.length === 0) {
      alert('Please fill in all required fields and upload at least one image.');
      return;
    }

    const newProperty = {
      price: parseFloat(price), // Ensure price is a number
      propertyType,
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      bedrooms: parseInt(bedrooms), // Ensure bedrooms is a number
      listingType,
      images, // Contains File objects; for real upload, you'd process these
    };

    console.log("New Property Data:", newProperty);

    if (onAddPropertySubmit) {
      onAddPropertySubmit(newProperty);
    }

    onClose();
    // Reset all form fields
    setPrice('');
    setPropertyType('');
    setSelectedCountry('');
    setSelectedState('');
    setSelectedCity('');
    setBedrooms('');
    setListingType('rent');
    setImages([]);
  };

  // Mock property types (can be imported from mockData if needed)
  const mockPropertyTypes = ['Any', 'Apartment', 'House', 'Condo', 'Studio', 'Townhouse', 'Commercial'];


  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Property</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="modalPrice" className="block text-gray-700 text-sm font-semibold mb-2">Price (per month)</label>
              <input
                type="number"
                id="modalPrice"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800"
                placeholder="e.g., 1500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="modalPropertyType" className="block text-gray-700 text-sm font-semibold mb-2">Property Type</label>
              <select
                id="modalPropertyType"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                required
              >
                <option value="">Select Type</option>
                {mockPropertyTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="modalCountry" className="block text-gray-700 text-sm font-semibold mb-2">Country</label>
              <select
                id="modalCountry"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800"
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setSelectedState('');
                  setSelectedCity('');
                }}
                required
              >
                <option value="">Select Country</option>
                {Object.keys(mockLocationData).map((countryName) => (
                  <option key={countryName} value={countryName}>{countryName}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="modalState" className="block text-gray-700 text-sm font-semibold mb-2">State</label>
              <select
                id="modalState"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800"
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedCity('');
                }}
                disabled={!selectedCountry}
                required
              >
                <option value="">Select State</option>
                {states.map((stateName) => (
                  <option key={stateName} value={stateName}>{stateName}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="modalCity" className="block text-gray-700 text-sm font-semibold mb-2">City</label>
              <select
                id="modalCity"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState}
                required
              >
                <option value="">Select City</option>
                {cities.map((cityName) => (
                  <option key={cityName} value={cityName}>{cityName}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="modalBedrooms" className="block text-gray-700 text-sm font-semibold mb-2">Number of Bedrooms</label>
              <select
                id="modalBedrooms"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
              </select>
            </div>
          </div>

          <div className="mb-6 mt-4 md:col-span-2">
            <label htmlFor="propertyImages" className="block text-gray-700 text-sm font-semibold mb-2">Upload Images</label>
            <input
              type="file"
              id="propertyImages"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              onChange={handleImageChange}
              multiple
              accept="image/*"
              required
            />
            {images.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                Selected: {images.map(file => file.name).join(', ')}
              </div>
            )}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {images.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  className="w-full h-24 object-cover rounded-md shadow-sm"
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Listing Type</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-purple-600"
                  name="listingType"
                  value="rent"
                  checked={listingType === 'rent'}
                  onChange={(e) => setListingType(e.target.value)}
                />
                <span className="ml-2 text-gray-700">For Rent</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-purple-600"
                  name="listingType"
                  value="roommate"
                  checked={listingType === 'roommate'}
                  onChange={(e) => setListingType(e.target.value)}
                />
                <span className="ml-2 text-gray-700">Looking for Roommate</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md font-semibold hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-purple-700 transition duration-200"
            >
              Add Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyModal;