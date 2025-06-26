import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
  },

  backIcon: {
    marginRight: 12,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3B82F6',
    flexShrink: 1,
  },

  contentContainer: {
    padding: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 20,
    marginBottom: 8,
  },

  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 22,
  },

  content: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },

  instructorName: {
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
  },

  errorText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 150,
    fontSize: 18,
    color: '#EF4444',
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },

  backButtonText: {
    color: '#3B82F6',
    fontSize: 16,
    marginLeft: 6,
  },

  enrollButton: {
  backgroundColor: '#3B82F6',
  paddingVertical: 16,
  marginHorizontal: 16,
  marginBottom: 24,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 2,
},

enrollButtonText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '600',
},

enrolledButton: {
  backgroundColor: '#6B7280', // gray to show disabled
},

});
