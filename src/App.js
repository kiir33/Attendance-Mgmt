import React, { useState } from 'react';
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
import AdminLeave from './pages/adminPages/Leave'
import AdminEmployees from './pages/adminPages/Employees'
import AdminReport from './pages/adminPages/Report'
import AdminUserForm from './pages/adminPages/UserForm'

import UserDashBoard from './pages/userPages/Dashboard'
import UserAttendance from './pages/userPages/Attendance'
import UserLeave from './pages/userPages/Leave'
import UserProfile from './pages/userPages/UserProfile'

import ForgotPasswordPage from './pages/authPages/ForgotPasswordPage';
import ResetPasswordPage from './pages/authPages/ResetPasswordPage';
import { getCookie } from './utils/cookies';



function App() {
  const state = useSelector(state =>state.root)
  
  const role = getCookie("role")
  const changeView = (user, admin) => {
    console.log(role === "3" )
    return role === "3" ? user : admin;
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
          <ProtectedRoute exact path={`/report`} component={AdminReport} />
          <ProtectedRoute exact path={`/leave`} component={changeView(UserLeave, AdminLeave)} />

          <Route path="*" component={() => "404 not found"} />
        </Switch>
      </Box>
    </Router >
  )
}




export default App;
