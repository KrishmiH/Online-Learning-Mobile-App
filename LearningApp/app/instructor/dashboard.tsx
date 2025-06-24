import { View, Text, Button } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';

export default function InstructorDashboard() {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Instructor Dashboard</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}
