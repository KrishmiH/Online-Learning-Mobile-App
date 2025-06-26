import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.title}>Enrolled Students</Text>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.cell, styles.headerText]}>#</Text>
        <Text style={[styles.cell, styles.headerText]}>Username</Text>
      </View>

      <FlatList
        data={students}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <View style={styles.tableRow}>
            <Text style={styles.cell}>{index + 1}</Text>
            <Text style={styles.cell}>{item.username}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  cell: {
    flex: 1,
    fontSize: 16,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#333',
  },
});
