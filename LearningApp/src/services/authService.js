import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  async login(username, password) {
    const response = await api.post('/auth/login', {
      username,
      password,
    });
    
    if (response.data.status === 'success') {
      await AsyncStorage.setItem('userToken', response.data.token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  },

  async register(username, password, role = 'student') {
    const response = await api.post('/auth/register', {
      username,
      password,
      role,
    });
    
    if (response.data.status === 'success') {
      await AsyncStorage.setItem('userToken', response.data.token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  },

  async logout() {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userInfo');
  },

  async getCurrentUser() {
    const userInfo = await AsyncStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  },

  async getToken() {
    return await AsyncStorage.getItem('userToken');
  },
};