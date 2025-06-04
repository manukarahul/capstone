import React, { useState, useEffect } from 'react';

const sendOtpApi = async (fullName, email) => {
  try {
    const response = await fetch('YOUR_BACKEND_SEND_OTP_ENDPOINT', { // <--- IMPORTANT: Replace
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

// Mock API function for verifying OTP
const verifyOtpApi = async (email, otp) => { // This just verifies OTP, doesn't create account yet
  console.log('Calling Verify OTP API with:', { email, otp });
  return new Promise(resolve => {
    setTimeout(() => {
      if (otp === '123456') { // Simulate successful verification for OTP '123456'
        resolve({ success: true, message: 'OTP verified successfully!' });
      } else {
        resolve({ success: false, message: 'Invalid OTP. Please try again.' });
      }
    }, 1500);
  });
};

// Mock API function for creating the account (after OTP is verified)
const createAccountApi = async (fullName, email, password) => {
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


const SignUpModal = ({ isOpen, onClose }) => {
  // Step 1 states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  // Step 2 state
  const [otp, setOtp] = useState('');

  // Step 3 states
  const [password, setPassword] = useState(''); // Reintroduced for Step 3
  const [confirmPassword, setConfirmPassword] = useState(''); // Reintroduced for Step 3

  // UI/Flow control states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false); // True after OTP is successfully sent
  const [otpVerified, setOtpVerified] = useState(false); // New: True after OTP is successfully verified

  // Effect to reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFullName('');
      setEmail('');
      setOtp('');
      setPassword(''); // Reset
      setConfirmPassword(''); // Reset
      setLoading(false);
      setError('');
      setOtpSent(false);
      setOtpVerified(false); // Reset
    }
  }, [isOpen]);

  // --- Handlers for each step ---

  // Handler for Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!fullName || !email) {
      setError('Please enter your full name and email.');
      setLoading(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    const response = await sendOtpApi(fullName, email); // Only pass name and email
    setLoading(false);

    if (response.success) {
      alert(response.message);
      setOtpSent(true);
      setError('');
      console.log('OTP sending successful:', response.message);
    } else {
      setError(response.message || 'Something went wrong while sending OTP.');
      console.error('OTP sending failed:', response.message);
    }
  };

  // Handler for Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!otp) {
      setError('Please enter the OTP.');
      setLoading(false);
      return;
    }

    const response = await verifyOtpApi(email, otp); // Verify OTP for the given email
    setLoading(false);

    if (response.success) {
      alert(response.message);
      setOtpVerified(true); // Move to Step 3
      setError('');
      console.log('OTP verification successful:', response.message);
    } else {
      setError(response.message || 'OTP verification failed. Please try again.');
      console.error('OTP verification failed:', response.message);
    }
  };

  // Handler for Step 3: Create Account (after OTP is verified)
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Frontend validation for password
    if (!password || !confirmPassword) {
      setError('Please enter and confirm your password.');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        setLoading(false);
        return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    const response = await createAccountApi(fullName, email, password); // Pass all data
    setLoading(false);

    if (response.success) {
      alert(response.message);
      console.log('Account creation successful:', response.message);
      onClose(); // Close modal on successful account creation
      // You might want to automatically log the user in or redirect them here
    } else {
      setError(response.message || 'Account creation failed. Please try again.');
      console.error('Account creation failed:', response.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md mx-4 relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        {/* Global Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Conditional Rendering for each step */}
        {/* Step 1: Enter Name and Email, Send OTP */}
        {!otpSent && !otpVerified && (
          <form onSubmit={handleSendOtp}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                id="fullName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="signUpEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="signUpEmail"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition duration-200 ease-in-out shadow-md"
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {/* Step 2: Enter OTP and Verify */}
        {otpSent && !otpVerified && (
          <form onSubmit={handleVerifyOtp}>
            <p className="text-gray-600 text-center mb-4">
              An OTP has been sent to <span className="font-semibold text-purple-600">{email}</span>. Please check your inbox and spam folder.
            </p>
            <div className="mb-6">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
              <input
                type="text"
                id="otp"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-center text-lg tracking-widest"
                placeholder="------"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').substring(0, 6))}
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-200 ease-in-out shadow-md"
              disabled={loading}
            >
              {loading ? 'Verifying OTP...' : 'Verify OTP'}
            </button>
            <button
              type="button"
              onClick={() => {
                setOtpSent(false); // Go back to Step 1
                setOtp('');
                setError(''); // Clear error
              }}
              className="w-full mt-3 text-sm text-gray-600 hover:text-purple-600 hover:underline transition duration-200 ease-in-out"
              disabled={loading}
            >
              Back to Change Email / Resend OTP
            </button>
          </form>
        )}

        {/* Step 3: Enter Password and Create Account */}
        {otpSent && otpVerified && (
          <form onSubmit={handleCreateAccount}>
            <p className="text-gray-600 text-center mb-4">
              Your email has been verified. Now, set your password to complete your account.
            </p>
            <div className="mb-4">
              <label htmlFor="signUpPassword" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="signUpPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition duration-200 ease-in-out shadow-md"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUpModal;