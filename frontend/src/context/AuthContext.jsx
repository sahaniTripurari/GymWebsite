import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const res = await api.get('/auth/me');
      setUser(res.data);
      localStorage.setItem('gym_user', JSON.stringify(res.data));
    } catch (err) {
      setUser(null);
      localStorage.removeItem('gym_user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      await fetchMe(); // Fetch full user details after login
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.msg || 'Login failed' };
    }
  };

  const signup = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      await fetchMe();
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.msg || 'Signup failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gym_user');
    // Important: In a real app, also clear the httpOnly cookie from backend or just let it expire
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
