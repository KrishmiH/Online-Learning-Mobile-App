import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/auth.styles';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await signIn({ username, password });
    } catch (error) {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Welcome Back</Title>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        mode="outlined"
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
      >
        Login
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate('Register')}
        style={styles.registerButton}
      >
        Don't have an account? Register
      </Button>
    </View>
  );
};

export default LoginScreen;
