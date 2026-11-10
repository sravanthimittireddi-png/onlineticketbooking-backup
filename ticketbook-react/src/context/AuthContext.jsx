import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, DEFAULT_USERS, getStoredItem, setStoredItem } from '../utils/storage';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { showToast } = useToast();

  const [users, setUsers] = useState(() => {
    return getStoredItem(STORAGE_KEYS.USERS, DEFAULT_USERS);
  });

  const [currentUser, setCurrentUser] = useState(() => {
    return getStoredItem(STORAGE_KEYS.CURRENT_USER, null);
  });

  // Ensure default users are seeded in localStorage
  useEffect(() => {
    const existing = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!existing) {
      setStoredItem(STORAGE_KEYS.USERS, DEFAULT_USERS);
    }
  }, []);

  const login = (email, password, role = 'user') => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === normalizedEmail);

    if (!user || user.password !== password) {
      showToast('Invalid email or password', 'error');
      return { success: false, message: 'Invalid email or password' };
    }

    if (user.role !== role) {
      showToast(`Role mismatch: Account is registered as "${user.role}"`, 'error');
      return { success: false, message: `Role mismatch: Account is registered as "${user.role}"` };
    }

    setCurrentUser(user);
    setStoredItem(STORAGE_KEYS.CURRENT_USER, user);
    showToast(`Welcome back, ${user.name}!`, 'success');
    return { success: true, user };
  };

  const signup = ({ name, email, phone, password, role = 'user' }) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
      showToast('Email already registered', 'error');
      return { success: false, message: 'Email already registered' };
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      password,
      role,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [...users, newUser];
    setUsers(updated);
    setStoredItem(STORAGE_KEYS.USERS, updated);
    showToast('Registration successful! Please sign in.', 'success');
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } catch (e) {}
    showToast('Logged out successfully', 'info');
  };

  const value = {
    users,
    currentUser,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.role === 'admin',
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
