import React, { Component } from 'react'
import Attendance from './Attendance'
import DashBoard from './Dashboard'
import Leave from './Leave'
import Employees from './Employees'
import Report from './Report'
import Header from '../../component/Header'
import SideBar from '../../component/SideBar'
import { Grid } from '@mui/material'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from '../../component/ProtectedRoute'
import UserDetail from './UserDetail'
import UserForm from './UserForm'

export default class index extends Component {


    render() {
        return (
            <>
                <Grid container>
                    <Grid item md={2} sm={2}>
                        <SideBar />
                    </Grid>
                    <Grid item md={10} sm={10}>
                        <Header {...this.props} />
                        <UserForm method="post"/>
                    <Router>
                        <Switch>
                            <ProtectedRoute exact path={this.props.match.path} component={Employees} />
                            <ProtectedRoute exact path={`${this.props.match.path}users/:id`} component={UserDetail}/>
                        </Switch>
                    </Router>
                    </Grid>
                </Grid>

            </>
        )
    }
}
