import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingTop: 50,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B82F6',
  },

  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    marginBottom: 16,
  },

  courseList: {
    paddingBottom: 100,
  },

  courseCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  courseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },

  courseDescription: {
    fontSize: 14,
    color: '#4B5563',
  },

  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    padding: 14,
    borderRadius: 30,
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    elevation: 4,
  },

  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },

  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 220,
    backgroundColor: '#3B82F6',
    paddingTop: 50,
    paddingHorizontal: 16,
    zIndex: 100,
  },

  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
  },

  sidebarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 30,
  },

  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },

  sidebarItemText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  
instructorName: {
  fontSize: 16,
  fontWeight: '500',
  color: '#6B7280',
  textAlign: 'right',
  marginBottom: 12,
},

cardButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 8,
},
updateButton: {
  color: '#3B82F6',
  fontWeight: '600',
},
deleteButton: {
  color: '#EF4444',
  fontWeight: '600',
},

});
