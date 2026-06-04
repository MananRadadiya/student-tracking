import api from './api';

export const teachingLogService = {
  getTeachingLogs: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.facultyId) params.append('facultyId', filters.facultyId);
    if (filters.streamId) params.append('streamId', filters.streamId);

    const response = await api.get(`/teaching-logs?${params.toString()}`);
    return response.data;
  },

  createTeachingLog: async (data) => {
    const response = await api.post('/teaching-logs', data);
    return response.data;
  },
};
