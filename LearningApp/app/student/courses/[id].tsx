import { useEffect, useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import api from '../../../src/services/api';

type Course = {
  _id: string;
  title: string;
  description: string;
  content: string;
};

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/courses/${id}`)
      .then((res) => setCourse(res.data.data.course))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const enroll = async () => {
    try {
      await api.post(`/courses/${id}/enroll`);
      alert('Enrolled successfully!');
      router.replace('/student/enrolled');
    } catch {
      alert('You may already be enrolled.');
    }
  };

  if (loading || !course) return <ActivityIndicator style={{ marginTop: 100 }} size="large" />;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{course.title}</Text>
      <Text style={{ marginTop: 8 }}>{course.description}</Text>
      <Text style={{ marginTop: 8 }}>{course.content}</Text>
      <Button title="Enroll Now" onPress={enroll} />
    </View>
  );
}
