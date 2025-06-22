import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import CoursesScreen from '../screens/Courses';
import CourseDetailScreen from '../screens/CourseDetail';
import EnrolledCoursesScreen from '../screens/EnrolledCourses';
import InstructorDashboard from '../screens/InstructorDashboard';
import CreateCourseScreen from '../screens/CreateCourse';
import LoadingIndicator from '../components/LoadingIndicator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!signed ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <>
          <Stack.Screen name="Courses" component={CoursesScreen} />
          <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
          <Stack.Screen name="EnrolledCourses" component={EnrolledCoursesScreen} />
          <Stack.Screen name="InstructorDashboard" component={InstructorDashboard} />
          <Stack.Screen name="CreateCourse" component={CreateCourseScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
