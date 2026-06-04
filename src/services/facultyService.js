import api from './api';

export const facultyService = {
  getFaculty: async () => {
    const response = await api.get('/faculty');
    return response.data;
  },

  createFaculty: async (data) => {
    const response = await api.post('/faculty', data);
    return response.data;
  },

  updateFaculty: async (id, data) => {
    const response = await api.put(`/faculty/${id}`, data);
    return response.data;
  },

  deleteFaculty: async (id) => {
    const response = await api.delete(`/faculty/${id}`);
    return response.data;
  },
};
