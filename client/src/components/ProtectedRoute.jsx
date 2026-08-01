import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; // poderia ser um loader temático aqui
  if (!user) return <Navigate to="/login" replace />;

  return children;
}