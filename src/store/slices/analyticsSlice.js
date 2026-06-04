import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { analyticsService } from '../../services/analyticsService';

// ─── Async Thunks ───

export const fetchWeeklySubmissions = createAsyncThunk('analytics/fetchWeekly', async (_, { rejectWithValue }) => {
  try {
    const response = await analyticsService.getWeeklySubmissions();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch weekly data');
  }
});

export const fetchStreamDistribution = createAsyncThunk('analytics/fetchStreamDist', async (_, { rejectWithValue }) => {
  try {
    const response = await analyticsService.getStreamDistribution();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch stream distribution');
  }
});

export const fetchMonthlyTrend = createAsyncThunk('analytics/fetchMonthlyTrend', async (_, { rejectWithValue }) => {
  try {
    const response = await analyticsService.getMonthlyTrend();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch monthly trend');
  }
});

export const fetchActivityTimeline = createAsyncThunk('analytics/fetchTimeline', async (_, { rejectWithValue }) => {
  try {
    const response = await analyticsService.getActivityTimeline();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch activity timeline');
  }
});

export const fetchDashboardSummary = createAsyncThunk('analytics/fetchSummary', async (_, { rejectWithValue }) => {
  try {
    const response = await analyticsService.getDashboardSummary();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard summary');
  }
});

// ─── Slice ───
const initialState = {
  weeklySubmissionData: [],
  streamDistributionData: [],
  monthlyTrendData: [],
  activityTimeline: [],
  summary: null,
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeeklySubmissions.fulfilled, (state, action) => {
        state.weeklySubmissionData = action.payload;
      })
      .addCase(fetchStreamDistribution.fulfilled, (state, action) => {
        state.streamDistributionData = action.payload;
      })
      .addCase(fetchMonthlyTrend.fulfilled, (state, action) => {
        state.monthlyTrendData = action.payload;
      })
      .addCase(fetchActivityTimeline.fulfilled, (state, action) => {
        state.activityTimeline = action.payload;
      })
      .addCase(fetchDashboardSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchDashboardSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default analyticsSlice.reducer;
