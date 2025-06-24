import React from 'react';
import { View, Text, TextInput, Button, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { router } from 'expo-router';

export default function RegisterForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: { username: '', password: '', role: 'student' },
  });
  const { signUp } = useAuth();

  const onSubmit = async (data) => {
    try {
      await signUp(data.username, data.password, data.role);
      alert('Registration successful. Please login.');
      router.replace('/auth/login');
    } catch (err) {
      alert('Registration failed. Try again.');
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
      <Controller
        control={control}
        name="role"
        render={({ field: { onChange, value } }) => (
          Platform.OS === 'web' ? (
            <select value={value} onChange={(e) => onChange(e.target.value)} style={{ marginBottom: 16 }}>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          ) : (
            <Picker selectedValue={value} onValueChange={onChange} style={{ marginBottom: 16 }}>
              <Picker.Item label="Student" value="student" />
              <Picker.Item label="Instructor" value="instructor" />
            </Picker>
          )
        )}
      />
      <Button title="Register" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
