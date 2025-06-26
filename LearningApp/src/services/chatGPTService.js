import api from './api';

// Send a prompt to ChatGPT to get course recommendations
export const getCourseRecommendations = async (prompt) => {
  const res = await api.post('/chatgpt/recommendations', { prompt });
  return res.data.data.recommendations;
};
