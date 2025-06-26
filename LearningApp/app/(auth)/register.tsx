import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import * as authService from '../../src/services/authService';
import authStyles from '../../src/styles/authStyles';
import { Ionicons } from '@expo/vector-icons';

type RegisterFormData = {
  username: string;
  password: string;
  role: string;
};

export default function Register() {
  const { control, handleSubmit, setValue } = useForm<RegisterFormData>();
  const [selectedRole, setSelectedRole] = useState('student');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await authService.register(data.username, data.password, selectedRole);
      alert('Registration successful. Please login.');
      router.replace('/(auth)/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <View style={authStyles.container}>
      <TouchableOpacity onPress={() => router.back()} style={authStyles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#374151" />
      </TouchableOpacity>

      <Text style={authStyles.heading}>Register</Text>

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

      <View style={authStyles.roleContainer}>
        <TouchableOpacity
          style={[authStyles.roleButton, selectedRole === 'student' && authStyles.roleButtonActive]}
          onPress={() => setSelectedRole('student')}
        >
          <Text style={authStyles.roleText}>Student</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[authStyles.roleButton, selectedRole === 'instructor' && authStyles.roleButtonActive]}
          onPress={() => setSelectedRole('instructor')}
        >
          <Text style={authStyles.roleText}>Instructor</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={authStyles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={authStyles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={authStyles.linkText}>
        Already have an account?{' '}
        <Text style={authStyles.link} onPress={() => router.push('/(auth)/login')}>
          Login
        </Text>
      </Text>
    </View>
  );
}
