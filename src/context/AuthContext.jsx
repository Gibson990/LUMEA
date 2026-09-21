import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, fetchCurrentUser } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('lumea_token') || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('lumea_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchCurrentUser(token)
        .then(data => {
          if (data && data.user) {
            setUser(data.user);
            localStorage.setItem('lumea_user', JSON.stringify(data.user));
          } else {
            logout();
          }
        })
        .catch(() => {
          const savedUser = localStorage.getItem('lumea_user');
          if (savedUser) setUser(JSON.parse(savedUser));
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    if (res.success) {
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('lumea_token', res.token);
      localStorage.setItem('lumea_user', JSON.stringify(res.user));
      setIsAuthModalOpen(false);
      return res;
    }
    throw new Error(res.message || 'Login failed');
  };

  const register = async (name, email, password) => {
    const res = await registerUser(name, email, password);
    if (res.success) {
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('lumea_token', res.token);
      localStorage.setItem('lumea_user', JSON.stringify(res.user));
      setIsAuthModalOpen(false);
      return res;
    }
    throw new Error(res.message || 'Registration failed');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('lumea_token');
    localStorage.removeItem('lumea_user');
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        loading,
        login,
        register,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        openAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
