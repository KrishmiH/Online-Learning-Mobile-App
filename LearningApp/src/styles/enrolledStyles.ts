import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // light background
    paddingHorizontal: 16,
    paddingTop: 24,
  },

  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3B82F6', // primary blue
    marginBottom: 16,
    textAlign: 'center',
  },

  listContent: {
    paddingBottom: 24,
  },

  courseCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  courseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },

  courseInstructor: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 8,
  },

  courseDescription: {
    fontSize: 14,
    color: '#374151',
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  emptyText: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
  },
});
