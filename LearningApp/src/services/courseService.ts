import api from './api';

export interface Course {
  _id: string;
  title: string;
  description: string;
  content: string;
  instructor: {
    _id: string;
    username: string;
  };
  studentsEnrolled: string[];
  createdAt: string;
}

interface CourseResponse {
  data: {
    courses?: Course[];
    course?: Course;
  };
}

export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const response = await api.get<CourseResponse>('/courses');
    return response.data.data?.courses || [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const getCourse = async (id: string): Promise<Course> => {
  try {
    const response = await api.get<CourseResponse>(`/courses/${id}`);
    return response.data.data?.course as Course;
  } catch (error) {
    console.error(`Error fetching course ${id}:`, error);
    throw error;
  }
};

export const createCourse = async (
  title: string,
  description: string,
  content: string
): Promise<Course> => {
  try {
    const response = await api.post<CourseResponse>('/courses', {
      title,
      description,
      content
    });
    return response.data.data?.course as Course;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

export const updateCourse = async (
  id: string,
  title?: string,
  description?: string,
  content?: string
): Promise<Course> => {
  try {
    const response = await api.patch<CourseResponse>(`/courses/${id}`, {
      ...(title && { title }),
      ...(description && { description }),
      ...(content && { content })
    });
    return response.data.data?.course as Course;
  } catch (error) {
    console.error(`Error updating course ${id}:`, error);
    throw error;
  }
};

export const deleteCourse = async (id: string): Promise<void> => {
  try {
    await api.delete(`/courses/${id}`);
  } catch (error) {
    console.error(`Error deleting course ${id}:`, error);
    throw error;
  }
};

export const enrollInCourse = async (courseId: string): Promise<void> => {
  try {
    await api.post(`/courses/${courseId}/enroll`);
  } catch (error) {
    console.error(`Error enrolling in course ${courseId}:`, error);
    throw error;
  }
};

export const getEnrolledCourses = async (): Promise<Course[]> => {
  try {
    const response = await api.get<CourseResponse>('/courses/me/enrolled');
    return response.data.data?.courses || [];
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    throw error;
  }
};

export const getCreatedCourses = async (): Promise<Course[]> => {
  try {
    const response = await api.get<CourseResponse>('/courses/me/created');
    return response.data.data?.courses || [];
  } catch (error) {
    console.error('Error fetching created courses:', error);
    throw error;
  }
};
