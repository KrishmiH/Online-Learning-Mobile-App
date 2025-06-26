import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { getCourseById, enrollInCourse, getEnrolledCourses } from '../../../src/services/courseService';
import courseDetailStyles from '../../../src/styles/courseDetailsStyles';

type Course = {
  _id: string;
  title: string;
  description: string;
  content: string;
  instructorName?: string;
};

export default function CourseDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    if (!id) return;

    // Fetch course details
    getCourseById(id)
      .then((data) => setCourse(data))
      .catch(console.error)
      .finally(() => setLoading(false));

    // Check if student already enrolled
    getEnrolledCourses()
      .then((courses) => {
        if (courses.some((c: Course) => c._id === id)) setEnrolled(true);
      })
      .catch(console.error);
  }, [id]);

  const handleEnroll = async () => {
    if (!id) return;

    setEnrolling(true);
    try {
      await enrollInCourse(id);
      Alert.alert('Success', 'You have been enrolled in this course!');
      setEnrolled(true);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to enroll. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 100 }} size="large" />;
  }

  if (!course) {
    return (
      <View style={courseDetailStyles.container}>
        <Text style={courseDetailStyles.errorText}>Course not found.</Text>
        <TouchableOpacity
          style={courseDetailStyles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#3B82F6" />
          <Text style={courseDetailStyles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={courseDetailStyles.container}>
      {/* Header */}
      <View style={courseDetailStyles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={courseDetailStyles.backIcon}
        >
          <MaterialIcons name="arrow-back" size={28} color="#3B82F6" />
        </TouchableOpacity>
        <Text style={courseDetailStyles.headerTitle}>{course.title}</Text>
      </View>

      <ScrollView contentContainerStyle={courseDetailStyles.contentContainer}>
        <Text style={courseDetailStyles.sectionTitle}>Description</Text>
        <Text style={courseDetailStyles.description}>{course.description}</Text>

        <Text style={courseDetailStyles.sectionTitle}>Content</Text>
        <Text style={courseDetailStyles.content}>{course.content}</Text>

        {course.instructorName && (
          <>
            <Text style={courseDetailStyles.sectionTitle}>Instructor</Text>
            <Text style={courseDetailStyles.instructorName}>{course.instructorName}</Text>
          </>
        )}
      </ScrollView>

      {/* Enroll Button */}
      <TouchableOpacity
        style={[
          courseDetailStyles.enrollButton,
          enrolled ? courseDetailStyles.enrolledButton : {},
        ]}
        disabled={enrolled || enrolling}
        onPress={handleEnroll}
      >
        <Text style={courseDetailStyles.enrollButtonText}>
          {enrolled ? 'Enrolled' : enrolling ? 'Enrolling...' : 'Enroll Now'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
