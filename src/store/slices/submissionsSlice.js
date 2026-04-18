import { createSlice } from '@reduxjs/toolkit';
import { mockSubmissions, mockFeedback, mockTeachingLogs } from '../../data/mockData';

const initialState = {
  submissions: mockSubmissions,
  feedback: mockFeedback,
  teachingLogs: mockTeachingLogs,
  filters: {
    stream: 'all',
    status: 'all',
    date: '',
    studentId: 'all',
  },
};

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    addSubmission(state, action) {
      state.submissions.unshift(action.payload);
    },
    updateSubmissionStatus(state, action) {
      const { id, status } = action.payload;
      const sub = state.submissions.find((s) => s.id === id);
      if (sub) sub.status = status;
    },
    addFeedback(state, action) {
      state.feedback.push(action.payload);
    },
    addTeachingLog(state, action) {
      state.teachingLogs.unshift(action.payload);
    },
    setFilter(state, action) {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    resetFilters(state) {
      state.filters = { stream: 'all', status: 'all', date: '', studentId: 'all' };
    },
  },
});

export const {
  addSubmission,
  updateSubmissionStatus,
  addFeedback,
  addTeachingLog,
  setFilter,
  resetFilters,
} = submissionsSlice.actions;
export default submissionsSlice.reducer;
