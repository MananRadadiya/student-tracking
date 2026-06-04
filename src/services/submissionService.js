import api from './api';

export const submissionService = {
  getSubmissions: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.stream && filters.stream !== 'all') params.append('stream', filters.stream);
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.date) params.append('date', filters.date);
    if (filters.studentId && filters.studentId !== 'all') params.append('studentId', filters.studentId);

    const response = await api.get(`/submissions?${params.toString()}`);
    return response.data;
  },

  createSubmission: async (formData) => {
    const response = await api.post('/submissions', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateSubmissionStatus: async (id, status) => {
    const response = await api.put(`/submissions/${id}/status`, { status });
    return response.data;
  },
};
