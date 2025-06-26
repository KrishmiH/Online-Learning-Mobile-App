import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_URL,
});

// Attach token from AsyncStorage before every request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token'); // Make sure key matches AuthContext
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
