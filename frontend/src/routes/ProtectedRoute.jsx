import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Route hanya untuk user yang belum login
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return <div className="loading-wrapper"><div className="spinner-border text-primary"/></div>;
  if (isAuthenticated()) {
    return <Navigate to={isAdmin() ? '/admin' : '/biodata'} replace />;
  }
  return children;
};

// Route hanya untuk user yang sudah login
export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="loading-wrapper"><div className="spinner-border text-primary"/></div>;
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  return children;
};

// Route hanya untuk admin
export const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return <div className="loading-wrapper"><div className="spinner-border text-primary"/></div>;
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (!isAdmin()) return <Navigate to="/biodata" replace />;
  return children;
};
