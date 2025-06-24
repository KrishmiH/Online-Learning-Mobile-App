import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../src/context/AuthContext';

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>
        Welcome, {user?.username}!
      </Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}
