import React from 'react';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';
import LoginPage from "./pages/authPages/LoginPage"
import ProtectedRoute from './component/ProtectedRoute';
import { theme } from './utils/theme';
import AdminUserDetail from './pages/adminPages/UserDetail';
import AdminAttendance from './pages/adminPages/Attendance'
import AdminDashBoard from './pages/adminPages/Dashboard'
import AdminLeave from './pages/adminPages/Requests'
import AdminEmployees from './pages/adminPages/Employees'
import AdminUserForm from './pages/adminPages/UserForm'
import AdminRequestView from './pages/adminPages/RequestView';
import AdminHolidayPage from './features/holiday/HolidayList';
import AdminHolidayForm from './features/holiday/AddHoliday';


import UserDashBoard from './pages/userPages/Dashboard'
import UserAttendance from './pages/userPages/Attendance'
import UserLeave from './pages/userPages/Requests'
import UserProfile from './pages/userPages/UserProfile'
import RequestForm from './pages/userPages/RequestForm'
import UserRequestView from './pages/userPages/RequestView';

import ForgotPasswordPage from './pages/authPages/ForgotPasswordPage';
import ResetPasswordPage from './pages/authPages/ResetPasswordPage';
import Notfound from './pages/pages/Notfound';


function App() {
  const state = useSelector(state => state.userDetail)
  const changeView = (user, admin) => {
    const role = state.currentUserData.role
    return role <= 2 ? admin : user;
  }

  return (
    <Router>
      <Box sx={{ bgcolor: theme.palette.light.main }}>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/forgot-password" component={ForgotPasswordPage} />
          <Route exact path="/resetPassword" component={ResetPasswordPage} />

          <ProtectedRoute exact path='/' component={changeView(UserDashBoard, AdminDashBoard)} />
          <ProtectedRoute exact path='/dashboard' component={changeView(UserDashBoard, AdminDashBoard)} />
          <ProtectedRoute exact path={`/users/:id`} component={AdminUserDetail} />
          <ProtectedRoute exact path="/userprofile" component={UserProfile}/>
          <ProtectedRoute exact path={`/newUser`} component={AdminUserForm} />
          <ProtectedRoute exact path={`/users/edit/:id`} component={AdminUserForm} />
          <ProtectedRoute exact path={`/attendance`} component={changeView(UserAttendance, AdminAttendance)} />
          <ProtectedRoute exact path={`/employees`} component={AdminEmployees} />
          <ProtectedRoute exact path={`/requests`} component={changeView(UserLeave, AdminLeave)} />
          <ProtectedRoute exact path={`/newRequest`} component={RequestForm} />
          <ProtectedRoute exact path={`/editRequest/:id`} component={RequestForm} />
          <ProtectedRoute exact path={`/requests/:id`} component={changeView(UserRequestView, AdminRequestView)} />
          <ProtectedRoute exact path={`/holidays`} component={AdminHolidayPage} />
          <ProtectedRoute exact path={`/newHoliday`} component={AdminHolidayForm} />
          <ProtectedRoute exact path={`/holiday/edit/:id`} component={AdminHolidayForm} />

          <Route path="*" component={Notfound} />
        </Switch>
      </Box>
    </Router >
  )
}




export default App;
