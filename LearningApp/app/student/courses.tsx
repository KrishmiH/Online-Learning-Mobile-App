import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import api from '../../src/services/api';
import { useRouter } from 'expo-router';

type Course = {
  _id: string;
  title: string;
  description: string;
  instructor?: {
    username: string;
  };
};

export default function CoursesScreen() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    api
      .get('/courses')
      .then((res) => setCourses(res.data.data.courses))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 100 }} size="large" />;

  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            marginBottom: 12,
            padding: 16,
            borderRadius: 10,
            elevation: 2,
          }}
          onPress={() => router.push(`/student/courses/${item._id}`)}
        >
          <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text style={{ color: 'gray', marginTop: 4 }}>
            Instructor: {item.instructor?.username ?? 'Unknown'}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}
