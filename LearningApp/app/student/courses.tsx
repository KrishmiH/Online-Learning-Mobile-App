import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import studentStyles from '../../src/styles/studentStyles';

type Course = {
  _id: string;
  title: string;
  description: string;
  instructor?: {
    username: string;
  };
};

type Props = {
  courses: Course[];
  loading: boolean;
};

export default function CoursesScreen({ courses, loading }: Props) {
  const router = useRouter();

  if (loading) return <ActivityIndicator style={{ marginTop: 100 }} size="large" color="#3B82F6" />;

  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item._id}
      contentContainerStyle={studentStyles.courseListContainer}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={studentStyles.courseCard}
          onPress={() => router.push(`/student/courses/${item._id}`)}
        >
          <Text style={studentStyles.courseTitle}>{item.title}</Text>
          <Text style={studentStyles.courseDescription}>{item.description}</Text>
          <Text style={studentStyles.courseInstructor}>
            Instructor: {item.instructor?.username ?? 'Unknown'}
          </Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <Text style={{ textAlign: 'center', marginTop: 20, color: '#555' }}>
          No courses available.
        </Text>
      }
    />
  );
}
