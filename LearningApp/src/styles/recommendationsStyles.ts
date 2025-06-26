import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Gray-100
  },

  chatContainer: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },

  messageContainer: {
    maxWidth: '75%',
    marginBottom: 12,
    padding: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  userMessage: {
    backgroundColor: '#3B82F6', // Blue
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },

  botMessage: {
    backgroundColor: '#E5E7EB', // Gray-200
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },

  userText: {
    color: 'white',
    fontSize: 16,
  },

  botText: {
    color: '#374151', // Gray-700
    fontSize: 16,
  },

  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#D1D5DB', // Gray-300
  },

  input: {
    flex: 1,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F9FAFB', // Gray-50
    borderRadius: 20,
    fontSize: 16,
    marginRight: 12,
  },

  sendButton: {
    backgroundColor: '#3B82F6', // Blue
    padding: 12,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
