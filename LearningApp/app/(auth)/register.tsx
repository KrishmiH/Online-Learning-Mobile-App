import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import * as authService from '../../src/services/authService';

type LoginFormData = {
  username: string;
  password: string;
  role: string;
};

export default function Register() {
  const { control, handleSubmit } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await authService.register(data.username, data.password, data.role);
      alert('Registration successful. Please login.');
      router.replace('/(auth)/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Register</Text>

      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Username"
            value={value}
            onChangeText={onChange}
            style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
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
            style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
          />
        )}
      />
      <Controller
        control={control}
        name="role"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Role (student / instructor)"
            value={value}
            onChangeText={onChange}
            style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
          />
        )}
      />

      <Button title="Register" onPress={handleSubmit(onSubmit)} />

      <Text style={{ marginTop: 16 }}>
        Already have an account?{' '}
        <Text style={{ color: '#3B82F6' }} onPress={() => router.push('/login')}>
          Login
        </Text>
      </Text>
    </View>
  );
}
