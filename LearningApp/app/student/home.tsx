import { View, Text, Button } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';

export default function StudentHome() {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Student Home</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}
