import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../../../src/services/api';
import { updateCourseStyles as styles } from '../../../src/styles/updateCourseStyles';

type FormData = {
  title: string;
  description: string;
  content: string;
};

export default function UpdateCourse() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { control, handleSubmit, setValue } = useForm<FormData>();

  useEffect(() => {
    api.get(`/courses/${id}`).then((res) => {
      const course = res.data.data.course;
      setValue('title', course.title);
      setValue('description', course.description);
      setValue('content', course.content);
    });
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      await api.patch(`/courses/${id}`, data);
      Alert.alert('Success', 'Course updated successfully!');
      router.push('/instructor/dashboard');
    } catch (err) {
      Alert.alert('Error', 'Failed to update course.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update Course</Text>

      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput placeholder="Title" style={styles.input} value={value} onChangeText={onChange} />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput placeholder="Description" style={styles.input} value={value} onChangeText={onChange} />
        )}
      />

      <Controller
        control={control}
        name="content"
        render={({ field: { onChange, value } }) => (
          <TextInput placeholder="Content" style={[styles.input, { height: 100 }]} multiline value={value} onChangeText={onChange} />
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Update Course</Text>
      </TouchableOpacity>
    </View>
  );
}
