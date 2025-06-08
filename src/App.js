import React from 'react';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import './App.css';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import HomeListingDetailPage from './pages/HomeListingDetailPage';
import MyPropertiesPage from './pages/MyPropertiesPage';
import ServicesPage from './pages/ServicesPage';

// Common Components
import ProtectedRoute from './components/common/ProtectedRoute';

// Utilities
import { getLocalStorageItem } from './utils/localStorage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
      loader: () => {
        // If a user is already logged in, redirect them to the home page
        if (getLocalStorageItem('userName')) {
          return redirect("/home");
        }
        return null;
      }
    },
    {
      // This is the protected section. All children here require authentication.
      element: <ProtectedRoute />, // Uses the ProtectedRoute as a layout wrapper
      children: [
        {
          path: "/home",
          element: <DashboardPage /> // Your main authenticated dashboard/homepage
        },
        {
          path: "/itemdetails",
          element: <HomeListingDetailPage /> // Details page for a specific listing
        },
        {
          path: "/showproperty",
          element: <MyPropertiesPage /> // Page to show user's own properties
        },
        {
          path: "/services",
          element: <ServicesPage /> // Services page
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