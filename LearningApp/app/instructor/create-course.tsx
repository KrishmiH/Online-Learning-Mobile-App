import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import api from '../../src/services/api';
import { router } from 'expo-router';

// ✅ Define the shape of your form
type CreateCourseFormData = {
  title: string;
  description: string;
  content: string;
};

export default function CreateCourseScreen() {
  // ✅ Pass the type to useForm
  const { control, handleSubmit, reset } = useForm<CreateCourseFormData>();

  const onSubmit = async (data: CreateCourseFormData) => {
    try {
      await api.post('/courses', data);
      alert('Course created successfully!');
      reset(); // Clear the form
      router.push('/instructor/my-courses');
    } catch (err) {
      console.error(err);
      alert('Error creating course');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create New Course</Text>

      <Controller
        control={control}
        name="title"
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
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Detailed Content"
            value={value}
            onChangeText={onChange}
            style={[styles.input, { height: 100 }]}
            multiline
          />
        )}
      />

      <Button title="Create Course" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 16,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
});
