import api from './api';

export const login = async (username, password) => {
  const res = await api.post('/auth/login', { username, password });
  return {
    user: res.data.data.user,
    token: res.data.token,
  }
};

export const register = async (username, password, role = 'student') => {
  const res = await api.post('/auth/register', { username, password, role });
  return res.data.data;
};
