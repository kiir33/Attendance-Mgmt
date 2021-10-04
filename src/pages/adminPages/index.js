import React, { Component } from 'react'
import Attendance from './Attendance'
import DashBoard from './Dashboard'
import Leave from './Leave'
import Employees from './Emplyees'
import Report from './Report'
import Header from '../../component/Header'
import SideBar from '../../component/SideBar'

export default class index extends Component {
    render() {
        return (
            <>
                <Header {...this.props}/>
                <SideBar/>
                <Employees/>
            </>
        )
    }
}
