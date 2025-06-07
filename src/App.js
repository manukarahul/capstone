import React, { useState, useEffect, useRef } from 'react';

import { createBrowserRouter, redirect, RouterProvider, Outlet, useNavigate } from 'react-router-dom';

import './App.css';

import Login from './Login';

import HomeListingDetail from './HomeListingsDetail';

import WebHome from './components/Home'; // Assuming this is your HomePage.js

import PropertyCardList from './PropertyCardList';

import { getLocalStorageItem } from './utils/localStorage';
import Navbar from './Navbar'; // Import Navbar
import Footer from './components/Footer'; // Import Footer (create this file if it doesn't exist)
import ScrollContext from './contexts/ScrollContext'; // Import your new context
import Services from './components/Services';



// --- ProtectedRoute Component ---

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
        block: 'end',
      });
    }
  };


  useEffect(() => {

    const userName = getLocalStorageItem('userName');

    if (userName) {

      setIsAuthenticated(true);

    } else {

      setIsAuthenticated(false);

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
          <Outlet /> {/* This will render WebHome, HomeListingDetail, PropertyCardList content */}
        </main>
        <Footer ref={footerRef} /> {/* Attach the ref to your Footer */}
      </div>
    </ScrollContext.Provider>
  ) : null;

};



function App() {

  const router = createBrowserRouter([

    {

      path: "/",

      element: <Login />,

      loader: () => {

        if (getLocalStorageItem('userName')) {

          return redirect("/home");

        }

        return null;

      }

    },

    {

      // This is the protected section. All children here require authentication.

      element: <ProtectedRoute />,

      children: [

        // Your existing authenticated routes, now nested under MainLayout

        {

          path: "/home",

          element: <WebHome /> // <-- Your HomePage.js is rendered here

        },

        {

          path: "/itemdetails",

          element: <HomeListingDetail />

        },

        {

          path: "/showproperty",

          element: <PropertyCardList />

        },

        {

          path: "/services",

          element: <Services />

        }

      ]

    }

  ]);



  return (

    <div className="App">

      <RouterProvider router={router} />

    </div>

  );

}



export default App;





