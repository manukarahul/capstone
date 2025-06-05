import React, { useState, useMemo } from 'react';
import { mockLocationData } from './mockData';
// Assuming mockLocationData is defined in a separate file like 'mockdata.js'
// You'll need to import it or pass it as a prop from the parent component.
// For this example, let's assume it's passed as a prop from the parent.

const AddPropertyModal = ({ isOpen, onClose, onAddPropertySubmit}) => {
  const [price, setPrice] = useState('');
  const [propertyType, setPropertyType] = useState('');
  // States for conditional location dropdowns
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [listingType, setListingType] = useState('rent'); // 'rent' or 'roommate'
  const [images, setImages] = useState([]); // State to store selected image files

  // Memoized lists for states and cities based on selections
  const states = useMemo(() => {
    return selectedCountry && mockLocationData[selectedCountry]
      ? Object.keys(mockLocationData[selectedCountry])
      : [];
  }, [selectedCountry, mockLocationData]);

  const cities = useMemo(() => {
    return selectedCountry && selectedState && mockLocationData[selectedCountry] && mockLocationData[selectedCountry][selectedState]
      ? mockLocationData[selectedCountry][selectedState]
      : [];
  }, [selectedCountry, selectedState, mockLocationData]);

  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  // Handle change for image input
  const handleImageChange = (e) => {
    // Convert FileList to an Array of files
    setImages(Array.from(e.target.files));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (you can add more robust validation)
    if (!price || !propertyType || !selectedCountry || !selectedState || !selectedCity || !bedrooms || !listingType || images.length === 0) {
      alert('Please fill in all required fields and upload at least one image.');
      return;
    }

    const newProperty = {
      price,
      propertyType,
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      bedrooms,
      listingType,
      images, // Contains File objects; for real upload, you'd process these
    };

    console.log("New Property Data:", newProperty);

    // Call the parent component's submission handler if provided
    // In a real application, you'd typically upload images to a server
    // (e.g., S3, Cloudinary) first, then send the form data along with the
    // resulting image URLs to your backend API.
    if (onAddPropertySubmit) {
      onAddPropertySubmit(newProperty);
    }

    
    onClose(); // Close the modal after submission

    // Reset all form fields
    setPrice('');
    setPropertyType('');
    setSelectedCountry('');
    setSelectedState('');
    setSelectedCity('');
    setBedrooms('');
    setListingType('rent');
    setImages([]); // Clear selected images
  };

  // Mock property types (consider passing this as a prop too if dynamic)
  const mockPropertyTypes = ['Any', 'Apartment', 'House', 'Condo', 'Studio', 'Townhouse'];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal content container - made wider with max-w-2xl */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Property</h2>
        <form onSubmit={handleSubmit}>
          {/* Grid layout for form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price */}
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

            {/* Property Type */}
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

            {/* Country Dropdown (Conditional) */}
            <div className="mb-4">
              <label htmlFor="modalCountry" className="block text-gray-700 text-sm font-semibold mb-2">Country</label>
              <select
                id="modalCountry"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800"
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setSelectedState(''); // Reset state when country changes
                  setSelectedCity('');  // Reset city when country changes
                }}
                required
              >
                <option value="">Select Country</option>
                {/* Dynamically populate countries from mockLocationData */}
                {Object.keys(mockLocationData).map((countryName) => (
                  <option key={countryName} value={countryName}>{countryName}</option>
                ))}
              </select>
            </div>

            {/* State Dropdown (Conditional) */}
            <div className="mb-4">
              <label htmlFor="modalState" className="block text-gray-700 text-sm font-semibold mb-2">State</label>
              <select
                id="modalState"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800"
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedCity(''); // Reset city when state changes
                }}
                disabled={!selectedCountry} 
                required
              >
                <option value="">Select State</option>
                {/* Dynamically populate states based on selectedCountry */}
                {states.map((stateName) => (
                  <option key={stateName} value={stateName}>{stateName}</option>
                ))}
              </select>
            </div>

            {/* City Dropdown (Conditional) */}
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
                {/* Dynamically populate cities based on selectedState */}
                {cities.map((cityName) => (
                  <option key={cityName} value={cityName}>{cityName}</option>
                ))}
              </select>
            </div>

            {/* Bedrooms */}
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
          </div> {/* End of grid for initial inputs */}

          {/* --- */}
          {/* Image Upload Section - Spanning full width on md and larger */}
          <div className="mb-6 mt-4 md:col-span-2"> {/* Added mt-4 for spacing from previous grid */}
            <label htmlFor="propertyImages" className="block text-gray-700 text-sm font-semibold mb-2">Upload Images</label>
            <input
              type="file"
              id="propertyImages"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              onChange={handleImageChange}
              multiple // Allows selecting multiple files
              accept="image/*" // Restricts file selection to image types
              required // Make image upload required
            />
            {images.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                Selected: {images.map(file => file.name).join(', ')}
              </div>
            )}
            {/* Optional: Add a preview of the selected images */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {images.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)} // Create a URL for image preview
                  alt={`Preview ${index}`}
                  className="w-full h-24 object-cover rounded-md shadow-sm"
                />
              ))}
            </div>
          </div>

          {/* --- */}
          {/* Rent or Roommate */}
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

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={()=>onClose()}
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