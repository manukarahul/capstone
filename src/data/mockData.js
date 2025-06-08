// src/data/mockData.js

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

  const roomImageUrls = [
    "https://plus.unsplash.com/premium_photo-1669083827853-de7a75b6daa9?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1748024093647-bbbfbe2c0c3f?q=80&w=2497&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1576941089067-2cd7367ce870?q=80&w=2550&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1594951465222-ac63428d098b?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
      description: `This is a ${isEven ? 'spacious' : 'cozy'} room located in the heart of Bengaluru. It offers a comfortable living experience with ${isEven ? 'modern amenities' : 'essential facilities'}. Ideal for ${isEven ? 'small families' : 'individuals'}.`,
      images: roomImageUrls, // Use all mock images for detail view
      amenities: [
        "Air Conditioning", "Washer/Dryer", "Elevator", "Gym",
        isEven ? "Pet Friendly" : null,
        "24/7 Security", "Parking Garage"
      ].filter(Boolean), // Filter out nulls
      ownerDetails: {
        name: `Owner ${roomNumber}`,
        phone: `+91-98765432${roomNumber % 10}`,
        email: `owner${roomNumber}@example.com`
      },
      ownerPreferences: {
        preferredTenants: isEven ? "Working professionals or families" : "Students or bachelors",
        minimumLeaseTermMonths: isEven ? 12 : 6,
        petsAllowed: isEven,
        smokingAllowed: !isEven,
        gymFreak: isEven,
        petLover: isEven,
        smokerFriendly: !isEven,
        vegNonVeg: isEven ? "Vegetarian" : "Non-Vegetarian"
      }
    };
  });

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