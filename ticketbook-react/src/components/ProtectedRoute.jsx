import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { currentUser, isAuthenticated, isAdmin } = useAuth();
  const { showToast } = useToast();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    showToast('Admin privilege required.', 'warning');
    return <Navigate to="/mall" replace />;
  }

  return children;
}
