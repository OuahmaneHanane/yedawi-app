import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (err) {
        console.error("Error parsing user:", err);
        setUser(null);
      }
    }
    setChecking(false);
  }, []);

  if (checking) return <div className="p-10 text-center text-lg">Checking access...</div>;

  // Not logged in → redirect to login
  if (!user || !localStorage.getItem('token')) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  // Role not allowed → redirect to unauthorized
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
