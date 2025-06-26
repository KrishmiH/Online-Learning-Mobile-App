import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import recommendationsStyles from '../../src/styles/recommendationsStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { getCourseRecommendations } from '../../src/services/chatGPTService';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
};

export default function Recommendations() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const recommendations = await getCourseRecommendations(userMessage.text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: recommendations.join('\n\n'),
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, something went wrong. Please try again.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    return (
      <View
        style={[
          recommendationsStyles.messageContainer,
          isUser ? recommendationsStyles.userMessage : recommendationsStyles.botMessage,
        ]}
      >
        <Text style={isUser ? recommendationsStyles.userText : recommendationsStyles.botText}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={recommendationsStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={recommendationsStyles.chatContainer}
        inverted
      />

      <View style={recommendationsStyles.inputContainer}>
        <TextInput
          placeholder="Ask for course recommendations..."
          value={input}
          onChangeText={setInput}
          style={recommendationsStyles.input}
          multiline
        />
        <TouchableOpacity
          style={recommendationsStyles.sendButton}
          onPress={sendMessage}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <MaterialIcons name="send" size={24} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
