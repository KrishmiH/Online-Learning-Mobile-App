import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { router } from 'expo-router';

export default function LoginForm() {
  const { control, handleSubmit } = useForm();
  const { signIn } = useAuth();

  const onSubmit = async (data) => {
    try {
      const user = await signIn(data.username, data.password);
      if (user.role === 'student') {
        router.replace('/student/home');
      } else {
        router.replace('/instructor/dashboard');
      }
    } catch (err) {
      alert('Login failed. Check your credentials.');
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
            style={{ marginBottom: 16, borderWidth: 1, padding: 8, borderRadius: 4 }}
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
            style={{ marginBottom: 16, borderWidth: 1, padding: 8, borderRadius: 4 }}
          />
        )}
      />
      <Button title="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
