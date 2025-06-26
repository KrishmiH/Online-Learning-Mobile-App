import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../../../src/services/api';
import { deleteCourseStyles as styles } from '../../../src/styles/deleteCourseStyles';

export default function DeleteCourse() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await api.delete(`/courses/${id}`);
      Alert.alert('Success', 'Course deleted successfully');
      router.push('/instructor/dashboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete course');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Delete</Text>
      <Text style={styles.text}>Are you sure you want to delete this course? This action cannot be undone.</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
