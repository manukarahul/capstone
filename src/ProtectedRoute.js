// ProtectedRoute.js
import { Navigate } from "react-router-dom";

const getLocalStorageItem = (key) => localStorage.getItem(key);

const ProtectedRoute = ({ children }) => {
  const user = getLocalStorageItem("userName");

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
