import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { submissionService } from '../../services/submissionService';
import { feedbackService } from '../../services/feedbackService';
import { teachingLogService } from '../../services/teachingLogService';

// ─── Async Thunks ───

export const fetchSubmissions = createAsyncThunk('submissions/fetchSubmissions', async (filters = {}, { rejectWithValue }) => {
  try {
    const response = await submissionService.getSubmissions(filters);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch submissions');
  }
});

export const createSubmissionAsync = createAsyncThunk('submissions/createSubmission', async (formData, { rejectWithValue }) => {
  try {
    const response = await submissionService.createSubmission(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create submission');
  }
});

export const updateSubmissionStatusAsync = createAsyncThunk('submissions/updateStatus', async ({ id, status }, { rejectWithValue }) => {
  try {
    const response = await submissionService.updateSubmissionStatus(id, status);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update submission status');
  }
});

export const fetchFeedback = createAsyncThunk('submissions/fetchFeedback', async (submissionId, { rejectWithValue }) => {
  try {
    const response = await feedbackService.getFeedback(submissionId);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch feedback');
  }
});

export const addFeedbackAsync = createAsyncThunk('submissions/addFeedback', async (data, { rejectWithValue }) => {
  try {
    const response = await feedbackService.addFeedback(data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to add feedback');
  }
});

export const fetchTeachingLogs = createAsyncThunk('submissions/fetchTeachingLogs', async (filters = {}, { rejectWithValue }) => {
  try {
    const response = await teachingLogService.getTeachingLogs(filters);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch teaching logs');
  }
});

export const createTeachingLogAsync = createAsyncThunk('submissions/createTeachingLog', async (data, { rejectWithValue }) => {
  try {
    const response = await teachingLogService.createTeachingLog(data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create teaching log');
  }
});

// ─── Slice ───
const initialState = {
  submissions: [],
  feedback: [],
  teachingLogs: [],
  filters: {
    stream: 'all',
    status: 'all',
    date: '',
    studentId: 'all',
  },
  loading: false,
  error: null,
};

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    setFilter(state, action) {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    resetFilters(state) {
      state.filters = { stream: 'all', status: 'all', date: '', studentId: 'all' };
    },
    clearSubmissionsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Submissions
      .addCase(fetchSubmissions.pending, (state) => { state.loading = true; })
      .addCase(fetchSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.submissions = action.payload;
      })
      .addCase(fetchSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Submission
      .addCase(createSubmissionAsync.fulfilled, (state, action) => {
        state.submissions.unshift(action.payload);
      })
      // Update Submission Status
      .addCase(updateSubmissionStatusAsync.fulfilled, (state, action) => {
        const sub = state.submissions.find((s) => s.id === action.payload.id);
        if (sub) sub.status = action.payload.status;
      })
      // Fetch Feedback
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.feedback = action.payload;
      })
      // Add Feedback
      .addCase(addFeedbackAsync.fulfilled, (state, action) => {
        state.feedback.push(action.payload);
      })
      // Fetch Teaching Logs
      .addCase(fetchTeachingLogs.fulfilled, (state, action) => {
        state.teachingLogs = action.payload;
      })
      // Create Teaching Log
      .addCase(createTeachingLogAsync.fulfilled, (state, action) => {
        state.teachingLogs.unshift(action.payload);
      });
  },
});

export const { setFilter, resetFilters, clearSubmissionsError } = submissionsSlice.actions;
export default submissionsSlice.reducer;
