import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate, redirect } from 'react-router-dom'; // Add redirect
import './App.css';
import HomePage from './Home';
import Login from './Login'; // Make sure Login.js handles its own redirection
import HomeListingDetail from './HomeListingsDetail';
// Removed: import WebHome from './components/Home'; // Assuming HomePage is the primary authenticated home

import { getLocalStorageItem } from './utils/localStorage';

// --- ProtectedRoute Component ---
const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userName = getLocalStorageItem('userName');
    if (userName) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate('/'); // Redirect to login if not authenticated
    }
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : null;
};
// --- End ProtectedRoute Component ---

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />, // Login component will handle redirection if user exists
    },
    {
      path: "/home",
      element: <ProtectedRoute />, // Wrap HomePage with ProtectedRoute
      children: [
        {
          index: true,
          element: <HomePage />
        }
      ]
    },
    // If WebHome is a different home page, give it a distinct path.
    // For example:
    // {
    //   path: "/web-home",
    //   element: <ProtectedRoute />,
    //   children: [
    //     {
    //       index: true,
    //       element: <WebHome />
    //     }
    //   ]
    // },
    {
      path: "/itemdetails",
      element: <HomeListingDetail />
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;