// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem('token');
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.id) {
            setUser(data);
            setIsAuthenticated(true);
          } else {
            logout();
          }
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token, logout]);

  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
      setUser(data);
      setIsAuthenticated(true);
      localStorage.setItem('token', data.token);
      return data;
    }
    throw new Error(data.message || 'Login failed');
  };

  const registerMentor = async (userData) => {
    const res = await fetch('/api/mentor/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
      setUser(data);
      setIsAuthenticated(true);
      localStorage.setItem('token', data.token);
      return data;
    }
    throw new Error(data.message || 'Registration failed');
  };

  const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    if (loading) {
      return <div>Loading Authentication...</div>;
    }
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  const value = {
    user,
    isAuthenticated,
    token,
    loading,
    login,
    logout,
    registerMentor,
    ProtectedRoute
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};