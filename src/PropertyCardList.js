import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import Navbar from './Navbar';

const PropertyCardList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProperty, setEditingProperty] = useState(null); // Stores the property currently being edited
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Controls modal visibility
  const [userName,setUserName] = useState('');
  useEffect(()=>{
    setUserName(localStorage.getItem('useName'))
  },[])
  // --- Mock API Call ---
  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const mockData = [
        {
          id: 'p1',
          title: 'Luxurious Apartment in a Prime Area',
          description: 'Spacious 3BHK with modern amenities, stunning city views, and access to a rooftop pool. Located in the heart of Bengaluru, close to tech parks and shopping centers. Ideal for urban living.',
          price: 15000000,
          location: 'Koramangala, Bengaluru',
          imageUrl: "https://housing-images.n7net.in/01c16c28/b002a90efbba4b1fb638af9989529eb9/v0/large/1_bhk_independent_house-for-rent-mahadevapura-Bangalore-bedroom.jpg",
        },
        {
          id: 'p2',
          title: 'Cozy Family Home with Garden',
          description: 'A charming 2-story house featuring a lush private garden, perfect for outdoor activities and relaxation. Located in a quiet, family-friendly neighborhood with excellent schools nearby.',
          price: 9500000,
          location: 'Whitefield, Bengaluru',
          imageUrl: 'https://via.placeholder.com/400x250/28a745/FFFFFF?text=Property+2'
        },
        {
          id: 'p3',
          title: 'Modern Commercial Office Space',
          description: 'Prime location for your thriving business. This office space offers ample parking, high-speed internet, and a contemporary design suitable for various industries. Excellent connectivity.',
          price: 22000000,
          location: 'Indiranagar, Bengaluru',
          imageUrl: 'https://via.placeholder.com/400x250/ffc107/333333?text=Property+3'
        },
        {
          id: 'p4',
          title: 'Compact Studio Apartment',
          description: 'An affordable and efficient studio apartment, ideal for bachelors, students, or young professionals. Features a kitchenette and a compact living area. Close to public transport.',
          price: 4500000,
          location: 'Electronic City, Bengaluru',
          imageUrl: 'https://via.placeholder.com/400x250/6c757d/FFFFFF?text=Property+4'
        },
        {
          id: 'p5',
          title: 'Sprawling Farmhouse Retreat',
          description: 'Escape the city to this spacious farmhouse with vast open land, ideal for weekend getaways or permanent rural living. Features multiple bedrooms and a serene environment.',
          price: 30000000,
          location: 'Devanahalli, Bengaluru',
          imageUrl: 'https://via.placeholder.com/400x250/800080/FFFFFF?text=Property+5'
        }
      ];

      await new Promise(resolve => setTimeout(resolve, 1000));
      setProperties(mockData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // --- Handlers for Edit and Delete ---

  const handleEdit = (propertyToEdit) => {
    setEditingProperty({ ...propertyToEdit }); // Create a copy to edit
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!editingProperty) return;

    // In a real app, you would make an API call here:
    // const response = await fetch(`/api/properties/${editingProperty.id}`, {
    //   method: 'PUT', // or PATCH
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(editingProperty),
    // });
    // if (!response.ok) { /* handle error */ }

    console.log("Simulating save for property:", editingProperty);

    // Update the local state with the edited property
    setProperties(prevProperties =>
      prevProperties.map(p => (p.id === editingProperty.id ? editingProperty : p))
    );
    setIsEditModalOpen(false);
    setEditingProperty(null);
    alert(`Property "${editingProperty.title}" updated successfully!`);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingProperty(null);
  };

  const handleDelete = async (propertyId) => {
    if (window.confirm(`Are you sure you want to delete property ID: ${propertyId}?`)) {
      try {
        // API call to delete
        // const response = await fetch(`/api/properties/${propertyId}`, { method: 'DELETE' });
        // if (!response.ok) { /* handle error */ }

        console.log(`Successfully deleted property with ID: ${propertyId} (mock)`);
        setProperties(prevProperties => prevProperties.filter(p => p.id !== propertyId));
        alert(`Property ${propertyId} deleted successfully!`);

      } catch (err) {
        console.error("Error deleting property:", err);
        setError("Failed to delete property. Please try again.");
      }
    }
  };

  // --- Render Logic ---

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
    // <div className="p-4  mx-auto text-center bg-gray-50 min-h-screen">
    <div className="min-h-screen bg-gray-100 font-sans">

      <Navbar/>
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

      {/* Edit Property Modal/Form */}
      {isEditModalOpen && editingProperty && (
        <div className="
          fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4
          z-50
        ">
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

export default PropertyCardList;