import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      const storedToken = await AsyncStorage.getItem('token');

      console.log('📦 Stored token on load:', storedToken);

      if (storedUser && storedToken && storedToken !== 'undefined') {
        setUser(JSON.parse(storedUser));
      } else {
        await AsyncStorage.removeItem('token'); // clear malformed token
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  const signIn = async (username, password) => {
    try {
      const data = await authService.login(username, password);
      const userData = data.user;
      const token = data.token;

      if (!token || token === 'undefined') {
        alert('Invalid token received');
        console.log('❌ Invalid token:', token);
        return;
      }

      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('token', token);
      console.log('✅ Token saved:', token);

      setUser(userData);
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Please check your credentials.');
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
