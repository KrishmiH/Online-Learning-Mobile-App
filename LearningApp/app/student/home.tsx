import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  ActivityIndicator,
  Animated,
  Easing,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { router } from 'expo-router';
import api from '../../src/services/api';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import studentStyles from '../../src/styles/studentStyles';

type Course = {
  _id: string;
  title: string;
  description: string;
  instructor?: {
    username: string;
  };
};

export default function StudentHome() {
  const { user, signOut } = useAuth();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarAnim] = useState(new Animated.Value(-Dimensions.get('window').width * 0.65));
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const [titleFilter, setTitleFilter] = useState('');
  const [instructorFilter, setInstructorFilter] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await api.get('/courses');
        setCourses(res.data.data.courses);
      } catch (error) {
        alert('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (sidebarVisible) {
      Animated.timing(sidebarAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(sidebarAnim, {
        toValue: -Dimensions.get('window').width * 0.65,
        duration: 300,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }
  }, [sidebarVisible, sidebarAnim]);

  const filteredCourses = courses.filter((course) => {
    const matchesTitle = course.title.toLowerCase().includes(titleFilter.toLowerCase());
    const matchesInstructor = course.instructor
      ? course.instructor.username.toLowerCase().includes(instructorFilter.toLowerCase())
      : false;
    return matchesTitle && matchesInstructor;
  });

  return (
    <View style={studentStyles.container}>
      <View style={studentStyles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)}>
          <Ionicons name="menu" size={32} color="#333" />
        </TouchableOpacity>
        <Text style={studentStyles.headerTitle}>Welcome, {user?.username}</Text>
      </View>

      <TouchableOpacity
        style={studentStyles.recommendationsButton}
        onPress={() => router.push('/student/recommendations')}
      >
        <MaterialCommunityIcons name="robot" size={24} color="#fff" style={{ marginRight: 8 }} />
        <Text style={studentStyles.recommendationsButtonText}>Get Course Recommendations</Text>
      </TouchableOpacity>

      <View style={studentStyles.filtersContainer}>
        <TextInput
          placeholder="Filter by course name"
          style={studentStyles.filterInput}
          value={titleFilter}
          onChangeText={setTitleFilter}
        />
        <TextInput
          placeholder="Filter by instructor"
          style={studentStyles.filterInput}
          value={instructorFilter}
          onChangeText={setInstructorFilter}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3B82F6" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredCourses}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 60 }}
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
              No courses found.
            </Text>
          }
        />
      )}

      <Modal
        animationType="none"
        transparent
        visible={sidebarVisible}
        onRequestClose={() => setSidebarVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setSidebarVisible(false)}>
          <View style={studentStyles.sidebarOverlay} />
        </TouchableWithoutFeedback>
        <Animated.View style={[studentStyles.sidebar, { left: sidebarAnim }]}>
          {/* Close button */}
          <TouchableOpacity
            style={studentStyles.closeButton}
            onPress={() => setSidebarVisible(false)}
            accessibilityLabel="Close sidebar"
          >
            <Ionicons name="close" size={28} color="#333" />
          </TouchableOpacity>

          <Text style={studentStyles.sidebarTitle}>Menu</Text>
          <TouchableOpacity
            style={studentStyles.sidebarItem}
            onPress={() => {
              setSidebarVisible(false);
              router.push('/student/enrolled');
            }}
          >
            <Ionicons name="book" size={22} color="#3B82F6" />
            <Text style={studentStyles.sidebarItemText}>My Enrolled Courses</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={studentStyles.sidebarItem}
            onPress={() => {
              setSidebarVisible(false);
              signOut();
              router.replace('/(auth)/login');
            }}
          >
            <Ionicons name="log-out" size={22} color="#EF4444" />
            <Text style={[studentStyles.sidebarItemText, { color: '#EF4444' }]}>Sign Out</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </View>
  );
}
