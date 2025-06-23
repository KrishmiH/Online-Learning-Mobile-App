import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn: (credentials: Credentials) => Promise<void>;
  signOut: () => void;
  signUp: (userData: UserData) => Promise<void>;
}

interface Credentials {
  username: string;
  password: string;
}

interface UserData extends Credentials {
  role?: string;
}

interface User {
  id: string;
  username: string;
  role: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser ] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser  = await AsyncStorage.getItem('@RNAuth:user');
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storagedUser  && storagedToken) {
        setUser (JSON.parse(storagedUser ));
      }
      setLoading(false);
    }

    loadStoragedData();
  }, []);

  async function signIn({ username, password }: Credentials) {
    const response = await authService.login(username, password);
    
    setUser ({
      id: response.user._id,
      username: response.user.username,
      role: response.user.role
    });

    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify({
      id: response.user._id,
      username: response.user.username,
      role: response.user.role
    }));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
  }

  async function signUp(userData: UserData) {
    const response = await authService.register(
      userData.username,
      userData.password,
      userData.role
    );

    setUser ({
      id: response.user._id,
      username: response.user.username,
      role: response.user.role
    });

    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify({
      id: response.user._id,
      username: response.user.username,
      role: response.user.role
    }));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser (null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut,
        signUp
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
