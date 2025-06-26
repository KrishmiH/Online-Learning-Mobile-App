import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');

    if (token && token !== 'undefined') {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('📡 Sending token:', token);
    } else {
      console.warn('⚠️ No valid token found');
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
