// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { useAuth } from '../context/AuthContext';
// import { colors } from '../styles/colors';
// import { Ionicons } from '@expo/vector-icons';

// // Student Screens
// import HomeScreen from '../screens/student/HomeScreen';
// import CoursesScreen from '../screens/student/CoursesScreen';
// import CourseDetailScreen from '../screens/student/CourseDetailScreen';
// import EnrolledCoursesScreen from '../screens/student/EnrolledCoursesScreen';
// import ChatGPTScreen from '../screens/student/ChatGPTScreen';

// // Instructor Screens
// import InstructorDashboard from '../screens/instructor/InstructorDashboard';
// import CreateCourseScreen from '../screens/instructor/CreateCourseScreen';
// import MyCourses from '../screens/instructor/MyCourses';
// import CourseStudents from '../screens/instructor/CourseStudents';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// // Student Stack Navigators
// const HomeStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen 
//       name="HomeMain" 
//       component={HomeScreen} 
//       options={{ headerShown: false }}
//     />
//     <Stack.Screen 
//       name="CourseDetail" 
//       component={CourseDetailScreen}
//       options={{ 
//         title: 'Course Details',
//         headerStyle: { backgroundColor: colors.primary },
//         headerTintColor: colors.surface,
//         headerTitleStyle: { fontWeight: 'bold' }
//       }}
//     />
//   </Stack.Navigator>
// );

// const CoursesStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen 
//       name="CoursesMain" 
//       component={CoursesScreen}
//       options={{ headerShown: false }}
//     />
//     <Stack.Screen 
//       name="CourseDetail" 
//       component={CourseDetailScreen}
//       options={{ 
//         title: 'Course Details',
//         headerStyle: { backgroundColor: colors.primary },
//         headerTintColor: colors.surface,
//         headerTitleStyle: { fontWeight: 'bold' }
//       }}
//     />
//   </Stack.Navigator>
// );

// const EnrolledStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen 
//       name="EnrolledMain" 
//       component={EnrolledCoursesScreen}
//       options={{ headerShown: false }}
//     />
//     <Stack.Screen 
//       name="CourseDetail" 
//       component={CourseDetailScreen}
//       options={{ 
//         title: 'Course Details',
//         headerStyle: { backgroundColor: colors.primary },
//         headerTintColor: colors.surface,
//         headerTitleStyle: { fontWeight: 'bold' }
//       }}
//     />
//   </Stack.Navigator>
// );

// // Instructor Stack Navigators
// const InstructorStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen 
//       name="DashboardMain" 
//       component={InstructorDashboard}
//       options={{ headerShown: false }}
//     />
//     <Stack.Screen 
//       name="CreateCourse" 
//       component={CreateCourseScreen}
//       options={{ 
//         title: 'Create Course',
//         headerStyle: { backgroundColor: colors.primary },
//         headerTintColor: colors.surface,
//         headerTitleStyle: { fontWeight: 'bold' }
//       }}
//     />
//     <Stack.Screen 
//       name="CourseStudents" 
//       component={CourseStudents}
//       options={{ 
//         title: 'Enrolled Students',
//         headerStyle: { backgroundColor: colors.primary },
//         headerTintColor: colors.surface,
//         headerTitleStyle: { fontWeight: 'bold' }
//       }}
//     />
//   </Stack.Navigator>
// );

// const MyCoursesStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen 
//       name="MyCoursesMain" 
//       component={MyCourses}
//       options={{ headerShown: false }}
//     />
//     <Stack.Screen 
//       name="CreateCourse" 
//       component={CreateCourseScreen}
//       options={{ 
//         title: 'Create Course',
//         headerStyle: { backgroundColor: colors.primary },
//         headerTintColor: colors.surface,
//         headerTitleStyle: { fontWeight: 'bold' }
//       }}
//     />
//     <Stack.Screen 
//       name="CourseStudents" 
//       component={CourseStudents}
//       options={{ 
//         title: 'Enrolled Students',
//         headerStyle: { backgroundColor: colors.primary },
//         headerTintColor: colors.surface,
//         headerTitleStyle: { fontWeight: 'bold' }
//       }}
//     />
//   </Stack.Navigator>
// );

// const TabNavigator = () => {
//   const { isInstructor } = useAuth();

//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused ? 'home' : 'home-outline';
//           } else if (route.name === 'Courses') {
//             iconName = focused ? 'book' : 'book-outline';
//           } else if (route.name === 'Enrolled') {
//             iconName = focused ? 'bookmark' : 'bookmark-outline';
//           } else if (route.name === 'AI Assistant') {
//             iconName = focused ? 'chatbubble' : 'chatbubble-outline';
//           } else if (route.name === 'Dashboard') {
//             iconName = focused ? 'grid' : 'grid-outline';
//           } else if (route.name === 'My Courses') {
//             iconName = focused ? 'library' : 'library-outline';
//           }

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: colors.primary,
//         tabBarInactiveTintColor: colors.textSecondary,
//         tabBarStyle: {
//           backgroundColor: colors.surface,
//           borderTopColor: colors.border,
//           height: 60,
//           paddingBottom: 8,
//           paddingTop: 8,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontWeight: '600',
//         },
//         headerShown: false,
//       })}
//     >
//       {isInstructor() ? (
//         <>
//           <Tab.Screen name="Dashboard" component={InstructorStack} />
//           <Tab.Screen name="My Courses" component={MyCoursesStack} />
//           <Tab.Screen name="Courses" component={CoursesStack} />
//           <Tab.Screen name="AI Assistant" component={ChatGPTScreen} />
//         </>
//       ) : (
//         <>
//           <Tab.Screen name="Home" component={HomeStack} />
//           <Tab.Screen name="Courses" component={CoursesStack} />
//           <Tab.Screen name="Enrolled" component={EnrolledStack} />
//           <Tab.Screen name="AI Assistant" component={ChatGPTScreen} />
//         </>
//       )}
//     </Tab.Navigator>
//   );
// };

// export default TabNavigator;