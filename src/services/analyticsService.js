import api from './api';

export const analyticsService = {
  getWeeklySubmissions: async () => {
    const response = await api.get('/analytics/weekly-submissions');
    return response.data;
  },

  getStreamDistribution: async () => {
    const response = await api.get('/analytics/stream-distribution');
    return response.data;
  },

  getMonthlyTrend: async () => {
    const response = await api.get('/analytics/monthly-trend');
    return response.data;
  },

  getActivityTimeline: async () => {
    const response = await api.get('/analytics/activity-timeline');
    return response.data;
  },

  getDashboardSummary: async () => {
    const response = await api.get('/analytics/summary');
    return response.data;
  },
};
