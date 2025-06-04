import logo from './logo.svg';
import './App.css';
import HomePage from './Home';
import Login from './Login';
import RoomCard from './RoomCard';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeListingDetail from './HomeListingsDetail';
import WebHome from './components/Home';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>
    },
    {
      path: "/home",
      element: <WebHome/>
    },
    {path:"/itemdetails",
      element:<HomeListingDetail/>
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;