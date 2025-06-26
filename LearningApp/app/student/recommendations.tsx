import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import api from '../../src/services/api';

type Recommendation = {
  title: string;
  description: string;
};

export default function ChatGPTScreen() {
  const [prompt, setPrompt] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const res = await api.post('/chatgpt/recommendations', { prompt });
      setRecommendations(res.data.data.recommendations);
    } catch (e) {
      alert('Something went wrong!');
    }
    setLoading(false);
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Enter your career goals or interests:</Text>
      <TextInput
        value={prompt}
        onChangeText={setPrompt}
        placeholder="e.g., I want to become a mobile app developer"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Get Recommendations" onPress={fetchRecommendations} />

      {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" />}
      <FlatList
        data={recommendations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 16, backgroundColor: '#fff', marginVertical: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}
