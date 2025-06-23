import api from './api';

export const chatGPTService = {
  async getCourseRecommendations(prompt) {
    const response = await api.post('/chatgpt/recommendations', {
      prompt,
    });
    return response.data;
  },
};