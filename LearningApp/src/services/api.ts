import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://YOUR_LOCAL_IP:5000/api/v1', 
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@RNAuth:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
