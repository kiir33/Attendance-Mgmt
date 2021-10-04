import React from 'react';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import SideBar from "./component/SideBar"
import Header from './component/Header';
import LoginPage from "./pages/LoginPage"
import AdminPage from "./pages/adminPages/index"
import UserPage from "./pages/userPages/index"
import { getCookie } from "./utils/cookies"
import ProtectedRoute from './component/ProtectedRoute';



function App() {
  const token = getCookie("token");


  return (
    <Router>
      <Box>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/" component={AdminPage} />
          <Route path="*" component={() => "404 not found"} />
        </Switch>
      </Box>
    </Router>
  )
}




export default App;
