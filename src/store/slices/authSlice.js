import { createSlice } from '@reduxjs/toolkit';
import { mockUsers } from '../../data/mockData';

const savedUser = localStorage.getItem('edutrack_user');

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: !!savedUser,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem('edutrack_user', JSON.stringify(action.payload));
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('edutrack_user');
    },
    clearError(state) {
      state.error = null;
    },
  },
});

// Thunk-like action for mock login
export const mockLogin = (email, password) => (dispatch) => {
  dispatch(loginStart());

  // Simulate network delay
  setTimeout(() => {
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const { password: _, ...safeUser } = user;
      dispatch(loginSuccess(safeUser));
    } else {
      dispatch(loginFailure('Invalid email or password'));
    }
  }, 800);
};

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
