import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../src/context/AuthContext';
import { router } from 'expo-router';
import authStyles from '../../src/styles/authStyles';
import { Ionicons } from '@expo/vector-icons';

type LoginFormData = {
  username: string;
  password: string;
};

export default function Login() {
  const { control, handleSubmit } = useForm<LoginFormData>();
  const { signIn } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data.username, data.password);
      router.replace('/redirect');
    } catch (err) {
      alert('Login failed. Please check credentials.');
    }
  };

  return (
    <View style={authStyles.container}>
      <TouchableOpacity onPress={() => router.back()} style={authStyles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#374151" />
      </TouchableOpacity>

      <Text style={authStyles.heading}>Login</Text>

      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Username"
            value={value}
            onChangeText={onChange}
            style={authStyles.input}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            style={authStyles.input}
          />
        )}
      />

      <TouchableOpacity style={authStyles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={authStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={authStyles.linkText}>
        Don't have an account?{' '}
        <Text style={authStyles.link} onPress={() => router.push('/(auth)/register')}>
          Register
        </Text>
      </Text>
    </View>
  );
}