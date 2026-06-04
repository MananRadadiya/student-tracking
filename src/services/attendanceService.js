import api from './api';

export const attendanceService = {
  getAttendance: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.date) params.append('date', filters.date);
    if (filters.studentId) params.append('studentId', filters.studentId);

    const response = await api.get(`/attendance?${params.toString()}`);
    return response.data;
  },

  getTodayRequests: async () => {
    const response = await api.get('/attendance/today-requests');
    return response.data;
  },

  markAttendance: async (studentId) => {
    const response = await api.post('/attendance/mark', { studentId });
    return response.data;
  },

  approveAttendance: async (id) => {
    const response = await api.put(`/attendance/${id}/approve`);
    return response.data;
  },

  rejectAttendance: async (id) => {
    const response = await api.put(`/attendance/${id}/reject`);
    return response.data;
  },
};
