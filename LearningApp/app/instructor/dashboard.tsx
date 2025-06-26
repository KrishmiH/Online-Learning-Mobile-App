import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import api from '../../src/services/api';
import { useRouter } from 'expo-router';
import instructorDashboardStyles from '../../src/styles/instructorDashboardStyles';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

type Course = {
  _id: string;
  title: string;
  description: string;
};

export default function InstructorDashboard() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]); // Explicitly typed as Course[]
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses/me/created');
        setCourses(res.data.data.courses);
        setFilteredCourses(res.data.data.courses);
      } catch (error) {
        alert('Failed to fetch your courses');
      }
    };
    fetchCourses();
  }, []);

  // Filter by course title
  const handleSearch = (text: string) => {
    setSearch(text);
    if (!text.trim()) {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter((c) =>
        c.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <View style={instructorDashboardStyles.container}>
      {/* Sidebar */}
      {sidebarOpen && (
        <View style={instructorDashboardStyles.sidebar}>
          <Pressable onPress={toggleSidebar} style={instructorDashboardStyles.closeBtn}>
            <Ionicons name="close" size={30} color="white" />
          </Pressable>
          <Text style={instructorDashboardStyles.sidebarTitle}>Menu</Text>

          <TouchableOpacity
            style={instructorDashboardStyles.sidebarItem}
            onPress={() => {
              router.push('/instructor/dashboard');
              toggleSidebar();
            }}
          >
            <Ionicons name="home" size={20} color="white" />
            <Text style={instructorDashboardStyles.sidebarItemText}>Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={instructorDashboardStyles.sidebarItem}
            onPress={() => {
              signOut();
              router.replace('/');
            }}
          >
            <MaterialIcons name="logout" size={20} color="white" />
            <Text style={instructorDashboardStyles.sidebarItemText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Top Bar */}
      <View style={instructorDashboardStyles.topBar}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Ionicons name="menu" size={28} color="#3B82F6" />
        </TouchableOpacity>
        <Text style={instructorDashboardStyles.pageTitle}>Instructor Dashboard</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="person-circle-outline" size={25} color="#3B82F6" />
          <Text style={{ marginLeft: 6, fontWeight: '600', color: '#3B82F6' }}>
            {user?.username || 'Instructor'}
          </Text>
        </View>
      </View>

      {/* Search Input */}
      <TextInput
        style={instructorDashboardStyles.searchInput}
        placeholder="Search courses by name..."
        value={search}
        onChangeText={handleSearch}
        autoCapitalize="none"
      />

      {/* Courses List */}
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item._id}
        style={instructorDashboardStyles.courseList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={instructorDashboardStyles.courseCard}
            onPress={() => router.push(`/instructor/students/${item._id}`)}
          >
            <Text style={instructorDashboardStyles.courseTitle}>{item.title}</Text>
            <Text style={instructorDashboardStyles.courseDescription}>{item.description}</Text>

            <View style={instructorDashboardStyles.cardButtons}>
              <TouchableOpacity 
                onPress={() => 
                  router.push({
                    pathname: '/instructor/update-course/[id]',
                    params: { id: item._id },
                  })
                }
              >
                <Text style={instructorDashboardStyles.updateButton}>✏️ Update</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => router.push({
                    pathname: '/instructor/delete-course/[id]',
                    params: { id: item._id },
                  })
                }
                >
                <Text style={instructorDashboardStyles.deleteButton}>🗑 Delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50, color: '#6B7280' }}>
            No courses found.
          </Text>
        }
      />

      {/* Create Course Button */}
      <TouchableOpacity
        style={instructorDashboardStyles.createButton}
        onPress={() => router.push('/instructor/create-course')}
      >
        <Ionicons name="add-circle-outline" size={24} color="#fff" />
        <Text style={instructorDashboardStyles.createButtonText}>Course</Text>
      </TouchableOpacity>
    </View>
  );
}
