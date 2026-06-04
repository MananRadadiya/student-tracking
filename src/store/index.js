import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import submissionsReducer from './slices/submissionsSlice';
import attendanceReducer from './slices/attendanceSlice';
import analyticsReducer from './slices/analyticsSlice';
import notificationsReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    submissions: submissionsReducer,
    attendance: attendanceReducer,
    analytics: analyticsReducer,
    notifications: notificationsReducer,
  },
});
