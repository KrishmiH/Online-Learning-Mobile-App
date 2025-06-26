import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import api from '../../../src/services/api';

type Student = {
  _id: string;
  username: string;
};

type Course = {
  _id: string;
  title: string;
  studentsEnrolled: Student[];
};

export default function CourseStudents() {
  const { id } = useLocalSearchParams();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/courses/me/created')
      .then((res) => {
        const courses: Course[] = res.data.data.courses;
        const course = courses.find((c) => c._id === id);
        setStudents(course?.studentsEnrolled || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator style={{ marginTop: 100 }} size="large" />;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Enrolled Students</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ padding: 12, backgroundColor: '#fff', marginBottom: 10, borderRadius: 8 }}>
            <Text style={{ fontWeight: '600' }}>{item.username}</Text>
          </View>
        )}
      />
    </View>
  );
}
