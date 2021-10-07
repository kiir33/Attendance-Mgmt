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
                    {/* <Router> */}
                    <Grid item md={2} sm={2}>
                        <Route component={SideBar} />
                    </Grid>
                    <Grid item md={10} sm={10}>
                        <Header {...this.props} />
                        {/* <UserForm method="post"/> */}
                        {/* <Switch>
                            <ProtectedRoute exact path={this.props.match.path} component={DashBoard} />
                            <ProtectedRoute exact path={`${this.props.match.path}users/:id`} component={UserDetail}/>
                            <ProtectedRoute exact path={`${this.props.match.path}newUser`} component={UserForm}/>
                            <ProtectedRoute exact path={`${this.props.match.path}attendance`} component={Attendance}/>
                            <ProtectedRoute path={`${this.props.match.path}employees`} component={Employees}/>
                            <ProtectedRoute exact path={`${this.props.match.path}report`} component={Report}/>
                            <ProtectedRoute exact path={`${this.props.match.path}leave`} component={Leave}/>
                        </Switch> */}
                    </Grid>
                    {/* </Router> */}
                </Grid>

            </>
        )
    }
}
