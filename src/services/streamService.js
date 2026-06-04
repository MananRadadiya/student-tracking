import api from './api';

export const streamService = {
  getStreams: async () => {
    const response = await api.get('/streams');
    return response.data;
  },

  createStream: async (data) => {
    const response = await api.post('/streams', data);
    return response.data;
  },

  deleteStream: async (id) => {
    const response = await api.delete(`/streams/${id}`);
    return response.data;
  },
};
