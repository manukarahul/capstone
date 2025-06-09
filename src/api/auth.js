// src/api/auth.js

/**
 * Simulates a login API call.
 * In a real application, this would make an actual fetch request to your backend.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<{success: boolean, message: string, userName?: string}>} - The API response.
 */
export const loginApi = async (email, password) => {
    try {
      // IMPORTANT: Replace 'YOUR_BACKEND_LOGIN_ENDPOINT' with your actual backend endpoint
      
      const data = {userName:email}
      if(email === 'anchal' && password === "1234")
        {
            
            return { success: true, message: 'Login successful!', userName: data.userName || 'User' };
        }
  
    } catch (error) {
      console.error('Network or server error during login:', error);
      return { success: false, message: 'Could not connect to the server. Please try again.' };
    }
  };
  
  /**
   * Simulates sending an OTP to the user's email for signup.
   * @param {string} fullName - The user's full name.
   * @param {string} email - The user's email.
   * @returns {Promise<{success: boolean, message: string}>}
   */
  export const sendOtpApi = async (fullName, email) => {
    try {
      // IMPORTANT: Replace 'YOUR_BACKEND_SEND_OTP_ENDPOINT' with your actual backend endpoint
      const response = await fetch('YOUR_BACKEND_SEND_OTP_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email }),
        credentials: 'include', // Needed if your backend also uses cookies for CSRF tokens or other reasons
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData.message || 'Failed to send OTP.' };
      }
      return { success: true, message: 'OTP sent successfully to your email!' };
    } catch (error) {
      console.error('Network or server error during send OTP:', error);
      return { success: false, message: 'Could not connect to the server. Please try again.' };
    }
  };
  
  /**
   * Simulates verifying the OTP.
   * @param {string} email - The user's email.
   * @param {string} otp - The OTP entered by the user.
   * @returns {Promise<{success: boolean, message: string}>}
   */
  export const verifyOtpApi = async (email, otp) => {
    console.log('Calling Verify OTP API with:', { email, otp });
    return new Promise(resolve => {
      setTimeout(() => {
        // Simulate successful verification for OTP '123456'
        if (otp === '123456') {
          resolve({ success: true, message: 'OTP verified successfully!' });
        } else {
          resolve({ success: false, message: 'Invalid OTP. Please try again.' });
        }
      }, 1500);
    });
  };
  
  /**
   * Simulates creating a new user account after OTP verification.
   * @param {string} fullName - The user's full name.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<{success: boolean, message: string}>}
   */
  export const createAccountApi = async (fullName, email, password) => {
    console.log('Calling Create Account API with:', { fullName, email, password });
    return new Promise(resolve => {
      setTimeout(() => {
        // In a real app, you'd send this to your backend to register the user
        if (password.length >= 6) { // Basic password length check
          resolve({ success: true, message: 'Account created successfully!' });
        } else {
          resolve({ success: false, message: 'Account creation failed. Password too short.' });
        }
      }, 1500);
    });
  };
  
  /**
   * Simulates fetching properties.
   * @returns {Promise<Array<Object>>} - An array of property objects.
   */
  export const fetchPropertiesApi = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const mockData = [
          {
            id: 'p1',
            title: 'Luxurious Apartment in a Prime Area',
            description: 'Spacious 3BHK with modern amenities, stunning city views, and access to a rooftop pool. Located in the heart of Bengaluru, close to tech parks and shopping centers. Ideal for urban living.',
            price: 15000000,
            location: 'Koramangala, Bengaluru',
            imageUrl: "https://housing-images.n7net.in/01c16c28/b002a90efbba4b1fb638af9989529eb9/v0/large/1_bhk_independent_house-for-rent-mahadevapura-Bangalore-bedroom.jpg",
            bedrooms: 3, bathrooms: 2, area: 1500
          },
          {
            id: 'p2',
            title: 'Cozy Family Home with Garden',
            description: 'A charming 2-story house featuring a lush private garden, perfect for outdoor activities and relaxation. Located in a quiet, family-friendly neighborhood with excellent schools nearby.',
            price: 9500000,
            location: 'Whitefield, Bengaluru',
            imageUrl: 'https://via.placeholder.com/400x250/28a745/FFFFFF?text=Property+2',
            bedrooms: 4, bathrooms: 3, area: 2000
          },
          {
            id: 'p3',
            title: 'Modern Commercial Office Space',
            description: 'Prime location for your thriving business. This office space offers ample parking, high-speed internet, and a contemporary design suitable for various industries. Excellent connectivity.',
            price: 22000000,
            location: 'Indiranagar, Bengaluru',
            imageUrl: 'https://via.placeholder.com/400x250/ffc107/333333?text=Property+3',
            bedrooms: 0, bathrooms: 1, area: 1000
          },
          {
            id: 'p4',
            title: 'Compact Studio Apartment',
            description: 'An affordable and efficient studio apartment, ideal for bachelors, students, or young professionals. Features a kitchenette and a compact living area. Close to public transport.',
            price: 4500000,
            location: 'Electronic City, Bengaluru',
            imageUrl: 'https://via.placeholder.com/400x250/6c757d/FFFFFF?text=Property+4',
            bedrooms: 1, bathrooms: 1, area: 450
          },
          {
            id: 'p5',
            title: 'Sprawling Farmhouse Retreat',
            description: 'Escape the city to this spacious farmhouse with vast open land, ideal for weekend getaways or permanent rural living. Features multiple bedrooms and a serene environment.',
            price: 30000000,
            location: 'Devanahalli, Bengaluru',
            imageUrl: 'https://via.placeholder.com/400x250/800080/FFFFFF?text=Property+5',
            bedrooms: 5, bathrooms: 4, area: 4000
          }
        ];
        resolve(mockData);
      }, 1000);
    });
  };
  
  /**
   * Simulates updating a property.
   * @param {Object} propertyData - The property data to update.
   * @returns {Promise<{success: boolean, message: string}>}
   */
  export const updatePropertyApi = async (propertyData) => {
    console.log("Simulating API update for property:", propertyData);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, message: `Property "${propertyData.title}" updated successfully!` });
      }, 500);
    });
  };
  
  /**
   * Simulates deleting a property.
   * @param {string} propertyId - The ID of the property to delete.
   * @returns {Promise<{success: boolean, message: string}>}
   */
  export const deletePropertyApi = async (propertyId) => {
    console.log(`Simulating API delete for property ID: ${propertyId}`);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, message: `Property ${propertyId} deleted successfully!` });
      }, 500);
    });
  };