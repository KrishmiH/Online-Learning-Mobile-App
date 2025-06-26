import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import api from '../../src/services/api';

type Course = {
  _id: string;
  title: string;
  description: string;
};

export default function EnrolledCoursesScreen() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/courses/me/enrolled')
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
        <View style={{ padding: 16, backgroundColor: '#fff', marginBottom: 12, borderRadius: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
      )}
    />
  );
}
