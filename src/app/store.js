import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import allUserReducer from '../features/allUser/allUserSlice'
import userDetailReducer from '../features/user/userDetailSlice'
import resetPasswordReducer from '../features/resetPassword/resetPasswordSlice'
import attendanceReducer from '../features/attendance/attendanceSlice';
import rootReducer from '../features/rootSlice';

export const store = configureStore({
  reducer: {
    root: rootReducer,
    auth: authReducer,
    allUser: allUserReducer,
    userDetail: userDetailReducer,
    resetPassword: resetPasswordReducer,
    attendance: attendanceReducer
  },
});
