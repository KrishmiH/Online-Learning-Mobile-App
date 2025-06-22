import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoragedData = async () => {
      const storagedUser  = await AsyncStorage.getItem('@RNAuth:user');
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storagedUser  && storagedToken) {
        setUser (JSON.parse(storagedUser ));
      }
      setLoading(false);
    };

    loadStoragedData();
  }, []);

  const signIn = async (credentials) => {
    const response = await authService.login(credentials.username, credentials.password);
    setUser (response.user);
    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
  };

  const signOut = async () => {
    await AsyncStorage.clear();
    setUser (null);
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
