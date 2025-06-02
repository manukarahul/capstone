import React, { useState } from 'react';

const SignUpModal = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Tenant'); // Default role

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log('Sign Up Submitted:', { fullName, email, password, role });
    alert(`Signing up as ${role} with Email: ${email}`);
    // Add your sign-up logic here (e.g., API call to register user)
    onClose(); // Close modal after submission
    // You might want to clear the form fields here:
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole('Tenant');
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
        <form onSubmit={handleSignUpSubmit}>
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
            />
          </div>
          <div className="mb-4">
            <label htmlFor="signUpEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="signUpEmail"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
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
            />
          </div>
          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Sign Up As</label>
            <select
              id="role"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Tenant">Tenant</option>
              <option value="Owner">Owner</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition duration-200 ease-in-out shadow-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;