// LearningApp/app/instructor/students/[id].tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../../../src/services/api';
import styles from '../../../src/styles/studentsStyles';
import { Ionicons } from '@expo/vector-icons';

type Student = {
  _id: string;
  username: string;
};

type Course = {
  _id: string;
  title: string;
  description: string;
  studentsEnrolled: Student[];
};

export default function CourseStudents() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/courses/me/created')
      .then((res) => {
        const courses: Course[] = res.data.data.courses;
        const selected = courses.find((c) => c._id === id);
        setCourse(selected || null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator style={{ marginTop: 100 }} size="large" color="#3B82F6" />;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} color="#3B82F6" />
        <Text style={styles.backText}></Text>
      </TouchableOpacity>

      <Text style={styles.title}>{course?.title}</Text>
      <Text style={styles.description}>{course?.description}</Text>

      <Text style={styles.subHeading}>Enrolled Students</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.cell, styles.headerText]}>#</Text>
        <Text style={[styles.cell, styles.headerText]}>Username</Text>
      </View>

      <FlatList
        data={course?.studentsEnrolled || []}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <View style={styles.tableRow}>
            <Text style={styles.cell}>{index + 1}</Text>
            <Text style={styles.cell}>{item.username}</Text>
          </View>
        )}
      />
    </View>
  );
}