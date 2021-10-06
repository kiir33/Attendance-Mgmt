import React from 'react';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import SideBar from "./component/SideBar"
import Header from './component/Header';
import LoginPage from "./pages/authPages/LoginPage"
import AdminPage from "./pages/adminPages/index"
import UserPage from "./pages/userPages/index"
import { getCookie } from "./utils/cookies"
import ProtectedRoute from './component/ProtectedRoute';
import { theme } from './utils/theme';
import UserDetail from './pages/adminPages/UserDetail';
import ForgotPasswordPage from './pages/authPages/ForgotPasswordPage';
import ResetPasswordPage from './pages/authPages/ResetPasswordPage';



function App() {
  const token = getCookie("token");

  return (
    <Router>
      <Box sx={{bgcolor: theme.palette.light.main}}>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/forgot-password" component={ForgotPasswordPage} />
          <Route exact path="/resetPassword" component={ResetPasswordPage} />
          <ProtectedRoute exact path="/" component={AdminPage} />
          <Route path="*" component={() => "404 not found"} />
        </Switch>
      </Box>
    </Router>
  )
}




export default App;
