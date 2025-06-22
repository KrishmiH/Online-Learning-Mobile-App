import api from './api';

interface LoginResponse {
  token: string;
  user: {
    _id: string;
    username: string;
    role: string;
  };
}

export const login = async (username: string, password: string) => {
  const response = await api.post<LoginResponse>('/auth/login', {
    username,
    password,
  });
  return response.data;
};

export const register = async (
  username: string,
  password: string,
  role?: string
) => {
  const response = await api.post<LoginResponse>('/auth/register', {
    username,
    password,
    role,
  });
  return response.data;
};
