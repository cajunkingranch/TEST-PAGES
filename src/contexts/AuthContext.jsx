import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (identifier, password) => {
    // Stub — replace with real API call
    console.log('Login attempt:', identifier);
    setUser({ email: identifier });
  };

  const signup = async (email, password, selectedPlan) => {
    // Stub — replace with real API call
    console.log('Signup attempt:', email, selectedPlan);
    setUser({ email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
