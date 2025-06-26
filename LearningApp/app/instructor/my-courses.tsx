import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import api from '../../src/services/api';
import { useRouter } from 'expo-router';
import myCoursesStyles from '../../src/styles/myCoursesStyles';

type Course = {
  _id: string;
  title: string;
  description: string;
};

export default function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    api
      .get('/courses/me/created')
      .then((res) => setCourses(res.data.data.courses))
      .catch(() => alert('Failed to fetch your courses'))
      .finally(() => setLoading(false));
  }, []);

  const renderCourse = ({ item }: { item: Course }) => (
    <TouchableOpacity
      style={myCoursesStyles.courseCard}
      onPress={() => router.push(`/instructor/students/${item._id}`)}
    >
      <Text style={myCoursesStyles.courseTitle}>{item.title}</Text>
      <Text style={myCoursesStyles.courseDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator style={myCoursesStyles.loading} size="large" color="#3B82F6" />;
  }

  if (courses.length === 0) {
    return (
      <View style={myCoursesStyles.emptyContainer}>
        <Text style={myCoursesStyles.emptyText}>You haven't created any courses yet.</Text>
      </View>
    );
  }

  return (
    <View style={myCoursesStyles.container}>
      <Text style={myCoursesStyles.heading}>My Created Courses</Text>
      <FlatList
        data={courses}
        keyExtractor={(item) => item._id}
        renderItem={renderCourse}
        contentContainerStyle={myCoursesStyles.listContent}
      />
    </View>
  );
}
