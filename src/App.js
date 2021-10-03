import React from 'react';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import SideBar from "./component/SideBar"
import Header from './component/Header';
import LoginPage from "./pages/LoginPage"
import { getCookie } from "./utils/cookies"



function App() {
  const token = getCookie("token");


  return (
    <Router>
      <Box>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/" component={SideBar} />
      </Box>
    </Router>
  )
}




export default App;
