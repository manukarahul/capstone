import React, { useState } from 'react';
import SignUpModal from './SignupModal';
import { useNavigate } from 'react-router-dom';
import { setLocalStorageItem } from './utils/localStorage';

const loginApi = async (email, password) => {
  try {
    const response = await fetch('YOUR_BACKEND_LOGIN_ENDPOINT', { // <--- IMPORTANT: Replace with your actual backend endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // <--- VERY IMPORTANT: Sends cookies with the request
    });

    if (!response.ok) {
      // If the response is not OK (e.g., 400, 401, 500)
      const errorData = await response.json();
      return { success: false, message: errorData.message || 'Login failed due to server error.' };
    }

    // If login is successful, the backend will have set the HttpOnly session cookie.
    // The frontend doesn't need to read anything from the response body for the session ID.
    // However, your backend might send user userName or other data in the response body.
    const data = await response.json();
    return { success: true, message: 'Login successful!', userName: data.userName || 'User' };

  } catch (error) {
    console.error('Network or server error during login:', error);
    return { success: false, message: 'Could not connect to the server. Please try again.' };
  }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // To show loading state during API call
  const [error, setError] = useState(''); // To display API errors

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(''); // Clear previous errors
    setLoading(true);

    const response = {};
    response.success = true;
    response.userName = "anchal"
    setLoading(false);

    if (response.success) {
      alert(`Login successful! Welcome ${response.userName || 'User'}!`);
      console.log('Login successful!', response);
      const sessionToken = setLocalStorageItem('userName', response.userName); // set the userName get it from the backend
      if(sessionToken){
        alert('login successful');
        navigate('/home');
      }
      
      // Here you would typically store the user's token/session and redirect
    } else {
      setError(response.message);
      console.error('Login failed:', response.message);
    }
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-xl shadow-lg flex flex-col lg:flex-row w-full max-w-6xl overflow-hidden">
        {/* Left Section: Login Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            {/* Logo Placeholder */}
           
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to GoogleRent</h1>
            <p className="text-gray-600">Login to your account or sign up below.</p>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          {/* Single Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition duration-200 ease-in-out shadow-md"
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* Sign Up Option */}
          <div className="text-center mt-4">
            <p className="text-gray-600">Don't have an account?</p>
            <button
              onClick={openSignUpModal}
              className="text-purple-600 font-semibold hover:underline mt-1"
            >
              Sign Up
            </button>
          </div>
        
          {/* Terms & Conditions / Privacy Policy */}
          <p className="text-center text-xs text-gray-500 mt-6">
            By logging in or signing up, you agree to our{' '}
            <a href="#" className="text-purple-600 hover:underline">Terms & Conditions</a> and{' '}
            <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>.
          </p>
        </div>

        {/* Right Section: Testimonial */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-purple-50 to-pink-50 p-8 md:p-12 flex flex-col items-center justify-center text-center relative rounded-r-xl">
          <blockquote className="text-2xl italic text-gray-800 mb-8 max-w-md">
            "GoogleRent transformed our property management. Finding reliable tenants has never been easier, and the owner portal is incredibly intuitive."
          </blockquote>
          <div className="flex flex-col items-center">
            {/* Testimonial Image */}
            <img
              src="https://placehold.co/80x80/E0BBE4/FFFFFF?text=SC" // Placeholder image
              alt="Sarah Chen"
              className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-white shadow-md"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x80/cccccc/000000?text=User"; }} // Fallback
            />
            <p className="text-lg font-semibold text-purple-700">Sarah Chen</p>
            <p className="text-sm text-gray-600">Property Manager, Elite Properties</p>
          </div>
        </div>
      </div>

      {/* Sign Up Modal */}
      <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUpModal} />
    </div>
  );
};

export default Login;