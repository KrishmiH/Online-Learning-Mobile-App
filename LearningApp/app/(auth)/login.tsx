import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../src/context/AuthContext';
import { router } from 'expo-router';

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
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Login</Text>

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

      <Button title="Login" onPress={handleSubmit(onSubmit)} />

      <Text style={{ marginTop: 16 }}>
        Don't have an account?{' '}
        <Text style={{ color: '#3B82F6' }} onPress={() => router.push('/(auth)/register')}>
          Register
        </Text>
      </Text>
    </View>
  );
}
