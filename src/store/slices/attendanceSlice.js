import { createSlice } from '@reduxjs/toolkit';
import { mockAttendance } from '../../data/mockData';

const today = new Date().toISOString().split('T')[0];

const initialState = {
  records: mockAttendance,
  todayRequests: [], // student requests for today
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    markAttendance: (state, action) => {
      const { studentId, date } = action.payload;
      // Check if already requested
      const exists = state.todayRequests.find((r) => r.studentId === studentId && r.date === date);
      if (exists) return;
      state.todayRequests.push({
        id: `att-req-${Date.now()}`,
        studentId,
        date,
        status: 'pending',
        markedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        approvedBy: null,
      });
    },
    approveAttendance: (state, action) => {
      const { requestId, facultyId } = action.payload;
      const req = state.todayRequests.find((r) => r.id === requestId);
      if (req) {
        req.status = 'present';
        req.approvedBy = facultyId;
        // Also add to records
        state.records.push({
          id: req.id,
          studentId: req.studentId,
          date: req.date,
          status: 'present',
          markedAt: req.markedAt,
          approvedBy: facultyId,
        });
      }
    },
    rejectAttendance: (state, action) => {
      const { requestId } = action.payload;
      const req = state.todayRequests.find((r) => r.id === requestId);
      if (req) {
        req.status = 'rejected';
      }
    },
  },
});

export const { markAttendance, approveAttendance, rejectAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
