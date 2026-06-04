import api from './api';

export const feedbackService = {
  getFeedback: async (submissionId) => {
    const params = submissionId ? `?submissionId=${submissionId}` : '';
    const response = await api.get(`/feedback${params}`);
    return response.data;
  },

  addFeedback: async (data) => {
    const response = await api.post('/feedback', data);
    return response.data;
  },
};
