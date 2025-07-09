import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Not logged in → redirect to login
  if (!token || !user) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  // Role not allowed → redirect to unauthorized
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  //  Render children or nested routes
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
