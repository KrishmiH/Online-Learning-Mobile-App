import { useEffect } from 'react';
import { useAuth } from '../src/context/AuthContext';
import { useRouter } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function RedirectScreen() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role === 'student') {
      router.replace('/student/home');
    } else if (user?.role === 'instructor') {
      router.replace('/instructor/dashboard');
    } else {
      router.replace('/(auth)/login');
    }
  }, [user]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#3B82F6" />
    </View>
  );
}
