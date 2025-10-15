// src/contexts/SessionContext.js
import React, { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export const SessionProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(() => {
    // Simulate anonymous session ID from localStorage or generate new
    return localStorage.getItem('sessionId') || `anon_${Date.now()}`;
  });

  const updateSessionId = (newId) => {
    setSessionId(newId);
    localStorage.setItem('sessionId', newId);
  };

  const value = {
    loading,
    setLoading,
    sessionId,
    updateSessionId
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};