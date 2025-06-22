import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Title } from 'react-native-paper';
import CourseCard from '../components/CourseCard';
import { getAllCourses } from '../services/courseService';
import styles from '../styles/course.styles';

const CoursesScreen = ({ navigation }: { navigation: any }) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Available Courses</Title>
      <FlatList
        data={courses}
        renderItem={({ item }) => (
          <CourseCard course={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default CoursesScreen;
