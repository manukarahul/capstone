// src/pages/MyPropertiesPage.js (Formerly PropertyCardList.js)
import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/cards/PropertyCard'; // Updated path
import { fetchPropertiesApi, updatePropertyApi, deletePropertyApi } from '../api/auth'; // Reusing auth API for now

const MyPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProperty, setEditingProperty] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userName, setUserName] = useState(''); // Will be populated from localStorage in a real app

  useEffect(() => {
    // In a real app, you'd likely get the userName from context or direct localStorage check
    // For now, it's just a placeholder as it's not used in this specific component's logic.
    setUserName(localStorage.getItem('userName') || '');
  }, []);

  useEffect(() => {
    const getProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPropertiesApi(); // Call the API function
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getProperties();
  }, []);

  const handleEdit = (propertyToEdit) => {
    setEditingProperty({ ...propertyToEdit });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingProperty) return;

    setLoading(true);
    try {
      const response = await updatePropertyApi(editingProperty); // Call the API function
      if (response.success) {
        setProperties(prevProperties =>
          prevProperties.map(p => (p.id === editingProperty.id ? editingProperty : p))
        );
        alert(response.message);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to save changes. Please try again.");
      console.error("Error saving property:", err);
    } finally {
      setLoading(false);
      setIsEditModalOpen(false);
      setEditingProperty(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingProperty(null);
  };

  const handleDelete = async (propertyId) => {
    if (window.confirm(`Are you sure you want to delete property ID: ${propertyId}?`)) {
      setLoading(true);
      try {
        const response = await deletePropertyApi(propertyId); // Call the API function
        if (response.success) {
          setProperties(prevProperties => prevProperties.filter(p => p.id !== propertyId));
          alert(response.message);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError("Failed to delete property. Please try again.");
        console.error("Error deleting property:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 text-lg text-gray-700">
        Loading properties...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-48 text-lg text-red-600 font-bold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <h2 className="text-4xl font-extrabold mb-8 text-gray-900 mt-10">Available Properties</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {properties.map(property => (
          <PropertyCard
            key={property.id}
            property={property}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {isEditModalOpen && editingProperty && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg relative">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Edit Property: {editingProperty.title}</h3>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label htmlFor="editTitle" className="block text-left text-gray-700 text-sm font-bold mb-2">
                  Title:
                </label>
                <input
                  type="text"
                  id="editTitle"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={editingProperty.title}
                  onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="editDescription" className="block text-left text-gray-700 text-sm font-bold mb-2">
                  Description:
                </label>
                <textarea
                  id="editDescription"
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={editingProperty.description}
                  onChange={(e) => setEditingProperty({ ...editingProperty, description: e.target.value })}
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="editPrice" className="block text-left text-gray-700 text-sm font-bold mb-2">
                  Price (₹):
                </label>
                <input
                  type="number"
                  id="editPrice"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={editingProperty.price}
                  onChange={(e) => setEditingProperty({ ...editingProperty, price: parseFloat(e.target.value) || 0 })}
                  required
                />
              </div>
              <div>
                <label htmlFor="editLocation" className="block text-left text-gray-700 text-sm font-bold mb-2">
                  Location:
                </label>
                <input
                  type="text"
                  id="editLocation"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={editingProperty.location}
                  onChange={(e) => setEditingProperty({ ...editingProperty, location: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="
                    px-6 py-2 rounded-md bg-gray-300 text-gray-800 font-medium
                    hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50
                    transition-colors duration-200
                  "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="
                    px-6 py-2 rounded-md bg-green-600 text-white font-medium
                    hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                    transition-colors duration-200
                  "
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPropertiesPage;