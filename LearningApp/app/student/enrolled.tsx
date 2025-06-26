import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import api from '../../src/services/api';
import enrolledStyles from '../../src/styles/enrolledStyles';
import { useRouter } from 'expo-router';

type Course = {
  _id: string;
  title: string;
  description: string;
  instructor?: {
    username: string;
  };
};

export default function EnrolledCourses() {
  const { user } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      setLoading(true);
      try {
        const res = await api.get('/courses/me/enrolled');
        setCourses(res.data.data.courses);
      } catch (error) {
        alert('Failed to fetch enrolled courses');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const renderCourse = ({ item }: { item: Course }) => (
    <TouchableOpacity
      style={enrolledStyles.courseCard}
      onPress={() => router.push(`/student/courses/${item._id}`)}
    >
      <Text style={enrolledStyles.courseTitle}>{item.title}</Text>
      {/* <Text style={enrolledStyles.courseInstructor}>
        Instructor: {item.instructor?.username ?? 'Unknown'}
      </Text> */}
      <Text style={enrolledStyles.courseDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  if (loading)
    return <ActivityIndicator style={enrolledStyles.loading} size="large" color="#3B82F6" />;

  if (courses.length === 0)
    return (
      <View style={enrolledStyles.emptyContainer}>
        <Text style={enrolledStyles.emptyText}>You have not enrolled in any courses yet.</Text>
      </View>
    );

  return (
    <View style={enrolledStyles.container}>
      <Text style={enrolledStyles.heading}>My Enrolled Courses</Text>
      <FlatList
        data={courses}
        keyExtractor={(item) => item._id}
        renderItem={renderCourse}
        contentContainerStyle={enrolledStyles.listContent}
      />
    </View>
  );
}
