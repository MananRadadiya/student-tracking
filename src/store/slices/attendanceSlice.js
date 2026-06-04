import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { attendanceService } from '../../services/attendanceService';

// ─── Async Thunks ───

export const fetchAttendance = createAsyncThunk('attendance/fetchAttendance', async (filters = {}, { rejectWithValue }) => {
  try {
    const response = await attendanceService.getAttendance(filters);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch attendance');
  }
});

export const fetchTodayRequests = createAsyncThunk('attendance/fetchTodayRequests', async (_, { rejectWithValue }) => {
  try {
    const response = await attendanceService.getTodayRequests();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch today requests');
  }
});

export const markAttendanceAsync = createAsyncThunk('attendance/markAttendance', async (studentId, { rejectWithValue }) => {
  try {
    const response = await attendanceService.markAttendance(studentId);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to mark attendance');
  }
});

export const approveAttendanceAsync = createAsyncThunk('attendance/approveAttendance', async (id, { rejectWithValue }) => {
  try {
    const response = await attendanceService.approveAttendance(id);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to approve attendance');
  }
});

export const rejectAttendanceAsync = createAsyncThunk('attendance/rejectAttendance', async (id, { rejectWithValue }) => {
  try {
    const response = await attendanceService.rejectAttendance(id);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to reject attendance');
  }
});

// ─── Slice ───
const initialState = {
  records: [],
  todayRequests: [],
  loading: false,
  error: null,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    clearAttendanceError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Attendance
      .addCase(fetchAttendance.pending, (state) => { state.loading = true; })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Today Requests
      .addCase(fetchTodayRequests.fulfilled, (state, action) => {
        state.todayRequests = action.payload;
      })
      // Mark Attendance
      .addCase(markAttendanceAsync.fulfilled, (state, action) => {
        state.todayRequests.push(action.payload);
      })
      .addCase(markAttendanceAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Approve Attendance
      .addCase(approveAttendanceAsync.fulfilled, (state, action) => {
        const req = state.todayRequests.find((r) => r.id === action.payload.id);
        if (req) {
          req.status = 'present';
          req.approved_by = action.payload.approved_by;
        }
        state.records.push(action.payload);
      })
      // Reject Attendance
      .addCase(rejectAttendanceAsync.fulfilled, (state, action) => {
        const req = state.todayRequests.find((r) => r.id === action.payload.id);
        if (req) req.status = 'rejected';
      });
  },
});

export const { clearAttendanceError } = attendanceSlice.actions;
export default attendanceSlice.reducer;
