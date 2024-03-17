import { Outlet, Navigate } from 'react-router-dom';
import { checkAuth } from '../utils/authUtils';

const ProtectedRoute = () => {
  const isAthenticated = checkAuth();
  return isAthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
