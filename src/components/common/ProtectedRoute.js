// src/components/common/ProtectedRoute.js
import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getLocalStorageItem } from '../../utils/localStorage'; // Updated path
import Navbar from './Navbar'; // Updated path
import Footer from './Footer'; // Updated path
import ScrollContext from '../../contexts/ScrollContext'; // Updated path

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Define footerRef and scrollToFooter right here in the common parent
  const footerRef = useRef(null);
  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end', // Scroll to the end of the element
      });
    }
  };

  useEffect(() => {
    const userName = getLocalStorageItem('userName');
    if (userName) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      // Redirect immediately if not authenticated
      // Using setTimeout with 0 ensures it runs after current render cycle
      setTimeout(() => {
        navigate('/');
      }, 0);
    }
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-700">Loading user session...</p>
      </div>
    );
  }

  // If authenticated, render the layout with Navbar, Outlet, and Footer
  return isAuthenticated ? (
    // Provide the scroll context to all children components (Navbar and Footer)
    <ScrollContext.Provider value={{ scrollToFooter, footerRef }}>
      <div className="flex flex-col min-h-screen"> {/* Add flexbox for sticky footer */}
        <Navbar /> {/* This is the ONLY place Navbar should be rendered for protected routes */}
        <main className="flex-grow">
          <Outlet /> {/* This will render content from nested routes */}
        </main>
        <Footer ref={footerRef} /> {/* Attach the ref to your Footer */}
      </div>
    </ScrollContext.Provider>
  ) : null;
};

export default ProtectedRoute;