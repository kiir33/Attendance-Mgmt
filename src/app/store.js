import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import allUserReducer from '../features/allUser/allUserSlice'
import userDetailReducer from '../features/user/userDetailSlice'
import resetPasswordReducer from '../features/resetPassword/resetPasswordSlice'
import attendanceReducer from '../features/attendance/attendanceSlice';
import requestReducer from '../features/request/requestSlice'
import holidayReducer from '../features/holiday/holidaySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    allUser: allUserReducer,
    userDetail: userDetailReducer,
    resetPassword: resetPasswordReducer,
    attendance: attendanceReducer,
    request: requestReducer,
    holiday: holidayReducer,
  },
});
