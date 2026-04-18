import { createSlice } from '@reduxjs/toolkit';
import { mockStudents, mockStreams, mockFaculty } from '../../data/mockData';

const initialState = {
  students: mockStudents,
  streams: mockStreams,
  faculty: mockFaculty,
  selectedStudent: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedStudent(state, action) {
      state.selectedStudent = action.payload;
    },
    addStudent(state, action) {
      state.students.push(action.payload);
    },
    updateStudent(state, action) {
      const idx = state.students.findIndex((s) => s.id === action.payload.id);
      if (idx !== -1) state.students[idx] = action.payload;
    },
    deleteStudent(state, action) {
      state.students = state.students.filter((s) => s.id !== action.payload);
    },
    addStream(state, action) {
      state.streams.push(action.payload);
    },
    deleteStream(state, action) {
      state.streams = state.streams.filter((s) => s.id !== action.payload);
    },
    addFaculty(state, action) {
      state.faculty.push(action.payload);
    },
    updateFaculty(state, action) {
      const idx = state.faculty.findIndex((f) => f.id === action.payload.id);
      if (idx !== -1) state.faculty[idx] = action.payload;
    },
    deleteFaculty(state, action) {
      state.faculty = state.faculty.filter((f) => f.id !== action.payload);
    },
  },
});

export const {
  setSelectedStudent,
  addStudent,
  updateStudent,
  deleteStudent,
  addStream,
  deleteStream,
  addFaculty,
  updateFaculty,
  deleteFaculty,
} = usersSlice.actions;
export default usersSlice.reducer;
