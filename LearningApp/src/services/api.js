import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // <-- replace YOUR_COMPUTER_IP with actual IP address
});

// Add token header automatically if exists
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@RNAuth:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
