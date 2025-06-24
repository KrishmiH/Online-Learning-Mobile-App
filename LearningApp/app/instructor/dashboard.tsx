import { View, Text, Button } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { router } from 'expo-router';

export default function InstructorDashboard() {
  const { signOut, user } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.replace('/(auth)/login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>
        Welcome Instructor: {user?.username}
      </Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}
