import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import api from '../../src/services/api';
import { useRouter } from 'expo-router';

// ✅ Step 1: Define the Course type
type Course = {
  _id: string;
  title: string;
  description: string;
};

export default function MyCourses() {
  // ✅ Step 2: Tell TypeScript this is an array of Course
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    api.get('/courses/me/created')
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
            backgroundColor: '#fff',
            marginBottom: 12,
            padding: 16,
            borderRadius: 10,
            elevation: 2,
          }}
          // Correct way to navigate with dynamic route parameter
          onPress={() => router.push(`/instructor/students/[id]`)}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
          <Text>{item.description}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
