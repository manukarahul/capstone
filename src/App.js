import React, { useState, useEffect } from 'react'; // <-- Import React hooks
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from 'react-router-dom'; // <-- Add Outlet and useNavigate
import './App.css';
import HomePage from './Home';
import Login from './Login';
// Removed: import RoomCard from './RoomCard'; (not used directly in App.js)
// Removed: import userEvent from '@testing-library/user-event'; (testing utility, not for app logic)

// Import local storage utilities (ensure these are in src/utils/localStorage.js)
import { getLocalStorageItem } from './utils/localStorage';

// --- ProtectedRoute Component (defined within app.js for now) ---
const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // To prevent flashing content

  useEffect(() => {
    // Check local storage for userName
    const userName = getLocalStorageItem('userName');
    if (userName) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      // If not authenticated, redirect to login.
      // Use a small timeout to ensure navigate runs after render cycle.
      setTimeout(() => {
        navigate('/');
      }, 0);
    }
    setIsLoading(false); // Authentication check is complete
  }, [navigate]); // Re-run if navigate function changes (unlikely for this basic setup)

  if (isLoading) {
    // Optionally render a loading spinner or null while checking auth status
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If authenticated, render the child routes (HomePage in this case)
  // If not authenticated, the useEffect has already navigated away.
  return isAuthenticated ? <Outlet /> : null;
};
// --- End ProtectedRoute Component ---


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
      // Optional: If user is already logged in, redirect from login page
      loader: () => {
        if (getLocalStorageItem('userName')) {
          // You could use `throw redirect("/home")` here if you prefer React Router's loader redirects
          // but for direct App.js control, we'll let ProtectedRoute handle it on /home
          // or navigate programmatically within Login.js after a successful attempt.
          // For now, let Login render, and Login.js handles navigation post-auth.
        }
        return null;
      }
    },
    {
      path: "/home",
      element: <ProtectedRoute />, // Wrap HomePage with ProtectedRoute
      children: [
        {
          index: true, // This makes HomePage the default child for /home
          element: <HomePage />
        }
      ]
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;