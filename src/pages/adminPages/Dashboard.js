import { Component } from 'react'
import { connect } from 'react-redux';
import { Box } from '@mui/system';
import { getAllAttendance } from '../../features/attendance/attendanceSlice';
import { getAllRequest } from '../../features/request/requestSlice';

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.dispatch = this.props.dispatch;
    }
    componentDidMount(){
        this.dispatch(getAllAttendance);
        this.dispatch(getAllRequest)
    }
    render() {
        return (
            <Box>
                <h1>AdminDashBoard</h1>
                
            </Box>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state }
}

Dashboard = connect(mapStateToProps)(Dashboard);