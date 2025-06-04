// Mock data for location filters
export const mockLocationData = {
    "USA": {
      "California": ["Los Angeles", "San Francisco", "San Diego"],
      "New York": ["New York City", "Buffalo"],
      "Texas": ["Houston", "Dallas"]
    },
    "India": {
      "Karnataka": ["Bengaluru", "Mysuru", "Hubballi"],
      "Maharashtra": ["Mumbai", "Pune"],
      "Delhi": ["New Delhi"]
    },
    "Canada": {
      "Ontario": ["Toronto", "Ottawa"],
      "British Columbia": ["Vancouver"]
    },
    // Add more countries, states, cities as needed
  };
  
  // Mock data for property types
  export const mockPropertyTypes = [
    "Any", "Apartment", "House", "Condo", "Townhouse", "Studio", "Commercial"
  ];
  
  // You can add more mock data for listings, users, etc., here
  // export const mockListings = [ ... ];
  // export const mockUsers = [ ... ];

  const roomImageUrls = [
    "https://housing-images.n7net.in/01c16c28/b002a90efbba4b1fb638af9989529eb9/v0/large/1_bhk_independent_house-for-rent-mahadevapura-Bangalore-bedroom.jpg",
    "https://housing-images.n7net.in/01c16c28/3d2b7c4d12f4477196655c4d34f07a0c/v0/large/1_bhk_independent_house-for-rent-mahadevapura-Bangalore-living_room.jpg",
    "https://housing-images.n7net.in/01c16c28/3e528b375b4742e9bc2c42e5b8d2d6c3/v0/large/1_bhk_independent_house-for-rent-mahadevapura-Bangalore-kitchen.jpg",
    "https://housing-images.n7net.in/01c16c28/c74e6f47732a4e21976077c570f71120/v0/large/1_bhk_independent_house-for-rent-mahadevapura-Bangalore-bathroom.jpg"
  ];
  
  // Generate 12 dummy room listings for testing
  export const mockRoomListings = Array.from({ length: 12 }).map((_, index) => {
    const imageIndex = index % roomImageUrls.length; // Cycle through the 4 image URLs
    const roomNumber = index + 1;
    const isEven = roomNumber % 2 === 0;
  
    return {
      id: `room-${roomNumber}`,
      imageUrl: roomImageUrls[imageIndex],
      title: `${isEven ? 'Spacious' : 'Cozy'} Room ${roomNumber}`,
      location: `Bengaluru, Karnataka`,
      price: `₹${(20000 + (index * 500)).toLocaleString('en-IN')}`, // Vary price
      bedrooms: isEven ? 2 : 1,
      bathrooms: isEven ? 2 : 1,
      area: isEven ? 1000 : 750,
    };
  });

  // src/mockData.js

// ... (existing mockLocationData, mockPropertyTypes, mockRoomListings) ...

// Mock Notification Data
export const mockNotifications = [
  {
    id: 'notif-1',
    message: 'Your application for "Spacious Room 2" has been approved!',
    type: 'success', // success, info, warning, error
    timestamp: '2025-06-02T10:30:00Z',
    read: false,
  },
  {
    id: 'notif-2',
    message: 'New message from owner of "Cozy Room 1".',
    type: 'info',
    timestamp: '2025-06-01T14:45:00Z',
    read: false,
  },
  {
    id: 'notif-3',
    message: 'Payment for "Luxury Condo" is due in 3 days.',
    type: 'warning',
    timestamp: '2025-05-30T09:00:00Z',
    read: true,
  },
  {
    id: 'notif-4',
    message: 'Special offer: 10% off on properties in Bangalore!',
    type: 'info',
    timestamp: '2025-05-28T18:00:00Z',
    read: true,
  },
  {
    id: 'notif-5',
    message: 'Your profile has been updated successfully.',
    type: 'success',
    timestamp: '2025-05-25T11:20:00Z',
    read: true,
  },
];