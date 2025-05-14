// src/components/auth/Routes.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { LoadingScreen } from '../ui/LoadingScreen';

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector(state => state.auth);
  
  if (isLoading) return <LoadingScreen />;
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector(state => state.auth);
  
  if (isLoading) return <LoadingScreen />;
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};