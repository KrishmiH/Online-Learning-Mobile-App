import api from './api';

// Get all courses (for students)
export const getAllCourses = async () => {
  const res = await api.get('/courses');
  return res.data.data.courses;
};

// Get course by ID
export const getCourseById = async (id) => {
  const res = await api.get(`/courses/${id}`);
  return res.data.data.course;
};

// Enroll in a course
export const enrollInCourse = async (id) => {
  const res = await api.post(`/courses/${id}/enroll`);
  return res.data.data.course;
};

// Get enrolled courses for the current student
export const getEnrolledCourses = async () => {
  const res = await api.get('/courses/me/enrolled');
  return res.data.data.courses;
};

// Instructor: create course
export const createCourse = async (data) => {
  const res = await api.post('/courses', data);
  return res.data.data.course;
};

// Instructor: get courses they created
export const getInstructorCourses = async () => {
  const res = await api.get('/courses/me/created');
  return res.data.data.courses;
};
