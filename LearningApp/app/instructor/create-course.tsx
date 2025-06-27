import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import api from '../../src/services/api';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type CreateCourseFormData = {
  title: string;
  description: string;
  content: string;
};

export default function CreateCourseScreen() {
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm<CreateCourseFormData>();

  const onSubmit = async (data: CreateCourseFormData) => {
    try {
      await api.post('/courses', data);
      alert('Course created successfully!');
      reset();
      router.push('/instructor/dashboard');
    } catch (err) {
      console.error(err);
      alert('Error creating course');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#3B82F6" />
        <Text style={styles.backText}></Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Create New Course</Text>

      <Controller
        control={control}
        name="title"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Course Title"
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Short Description"
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />

      <Controller
        control={control}
        name="content"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Detailed Content"
            value={value}
            onChangeText={onChange}
            style={[styles.input, styles.textArea]}
            multiline
          />
        )}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.submitButtonText}>Create Course</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  backText: {
    color: '#3B82F6',
    fontSize: 18,
    marginLeft: 5,
  },

  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 25,
    color: '#111827',
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
  },

  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  submitButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },

  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
