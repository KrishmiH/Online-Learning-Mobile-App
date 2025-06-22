import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/course.styles';

const CourseCard = ({ course, navigation }: { course: any; navigation: any }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CourseDetail', { courseId: course._id })}
    >
      <Text style={styles.cardTitle}>{course.title}</Text>
      <Text style={styles.cardDescription}>{course.description}</Text>
    </TouchableOpacity>
  );
};

export default CourseCard;
