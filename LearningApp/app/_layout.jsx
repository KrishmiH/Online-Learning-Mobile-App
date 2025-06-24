import { Stack } from 'expo-router';
import { AuthProvider } from '../src/context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/register" />
        <Stack.Screen name="redirect" />
        <Stack.Screen name="student/home" />
        <Stack.Screen name="instructor/dashboard" />
      </Stack>
    </AuthProvider>
  );
}
