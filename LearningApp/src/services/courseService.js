import api from './api';

export const courseService = {
  async getAllCourses() {
    const response = await api.get('/courses');
    return response.data;
  },

  async getCourse(id) {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  async createCourse(courseData) {
    const response = await api.post('/courses', courseData);
    return response.data;
  },

  async updateCourse(id, courseData) {
    const response = await api.patch(`/courses/${id}`, courseData);
    return response.data;
  },

  async deleteCourse(id) {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },

  async enrollInCourse(id) {
    const response = await api.post(`/courses/${id}/enroll`);
    return response.data;
  },

  async getEnrolledCourses() {
    const response = await api.get('/courses/me/enrolled');
    return response.data;
  },

  async getInstructorCourses() {
    const response = await api.get('/courses/me/created');
    return response.data;
  },
};