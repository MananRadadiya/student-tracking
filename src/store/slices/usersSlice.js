import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { studentService } from '../../services/studentService';
import { streamService } from '../../services/streamService';
import { facultyService } from '../../services/facultyService';

// ─── Async Thunks ───

// Students
export const fetchStudents = createAsyncThunk('users/fetchStudents', async (_, { rejectWithValue }) => {
  try {
    const response = await studentService.getStudents();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch students');
  }
});

export const createStudentAsync = createAsyncThunk('users/createStudent', async (data, { rejectWithValue }) => {
  try {
    const response = await studentService.createStudent(data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create student');
  }
});

export const updateStudentAsync = createAsyncThunk('users/updateStudent', async ({ id, ...data }, { rejectWithValue }) => {
  try {
    const response = await studentService.updateStudent(id, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update student');
  }
});

export const deleteStudentAsync = createAsyncThunk('users/deleteStudent', async (id, { rejectWithValue }) => {
  try {
    await studentService.deleteStudent(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete student');
  }
});

// Streams
export const fetchStreams = createAsyncThunk('users/fetchStreams', async (_, { rejectWithValue }) => {
  try {
    const response = await streamService.getStreams();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch streams');
  }
});

export const createStreamAsync = createAsyncThunk('users/createStream', async (data, { rejectWithValue }) => {
  try {
    const response = await streamService.createStream(data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create stream');
  }
});

export const deleteStreamAsync = createAsyncThunk('users/deleteStream', async (id, { rejectWithValue }) => {
  try {
    await streamService.deleteStream(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete stream');
  }
});

// Faculty
export const fetchFaculty = createAsyncThunk('users/fetchFaculty', async (_, { rejectWithValue }) => {
  try {
    const response = await facultyService.getFaculty();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch faculty');
  }
});

export const createFacultyAsync = createAsyncThunk('users/createFaculty', async (data, { rejectWithValue }) => {
  try {
    const response = await facultyService.createFaculty(data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create faculty');
  }
});

export const updateFacultyAsync = createAsyncThunk('users/updateFaculty', async ({ id, ...data }, { rejectWithValue }) => {
  try {
    const response = await facultyService.updateFaculty(id, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update faculty');
  }
});

export const deleteFacultyAsync = createAsyncThunk('users/deleteFaculty', async (id, { rejectWithValue }) => {
  try {
    await facultyService.deleteFaculty(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete faculty');
  }
});

// ─── Slice ───
const initialState = {
  students: [],
  streams: [],
  faculty: [],
  selectedStudent: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedStudent(state, action) {
      state.selectedStudent = action.payload;
    },
    clearUsersError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Students
      .addCase(fetchStudents.pending, (state) => { state.loading = true; })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Student
      .addCase(createStudentAsync.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      // Update Student
      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        const idx = state.students.findIndex((s) => s.id === action.payload.id);
        if (idx !== -1) state.students[idx] = action.payload;
      })
      // Delete Student
      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        state.students = state.students.filter((s) => s.id !== action.payload);
      })
      // Fetch Streams
      .addCase(fetchStreams.pending, (state) => { state.loading = true; })
      .addCase(fetchStreams.fulfilled, (state, action) => {
        state.loading = false;
        state.streams = action.payload;
      })
      .addCase(fetchStreams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Stream
      .addCase(createStreamAsync.fulfilled, (state, action) => {
        state.streams.push(action.payload);
      })
      // Delete Stream
      .addCase(deleteStreamAsync.fulfilled, (state, action) => {
        state.streams = state.streams.filter((s) => s.id !== action.payload);
      })
      // Fetch Faculty
      .addCase(fetchFaculty.pending, (state) => { state.loading = true; })
      .addCase(fetchFaculty.fulfilled, (state, action) => {
        state.loading = false;
        state.faculty = action.payload;
      })
      .addCase(fetchFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Faculty
      .addCase(createFacultyAsync.fulfilled, (state, action) => {
        state.faculty.push(action.payload);
      })
      // Update Faculty
      .addCase(updateFacultyAsync.fulfilled, (state, action) => {
        const idx = state.faculty.findIndex((f) => f.id === action.payload.id);
        if (idx !== -1) state.faculty[idx] = action.payload;
      })
      // Delete Faculty
      .addCase(deleteFacultyAsync.fulfilled, (state, action) => {
        state.faculty = state.faculty.filter((f) => f.id !== action.payload);
      });
  },
});

export const { setSelectedStudent, clearUsersError } = usersSlice.actions;
export default usersSlice.reducer;
