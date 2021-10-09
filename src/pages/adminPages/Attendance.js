import { Component } from 'react'
import CustomPaginationActionsTable from '../../component/Table'
import { getAllAttendance } from '../../features/attendance/attendanceSlice';
import { connect } from 'react-redux';
import { Box } from '@mui/system';


export default class Attendance extends Component {
    constructor(props){
        super(props);
        this.dispatch = this.props.dispatch;
        this.location = this.props.location;
    }

    componentDidMount() {
        this.dispatch(getAllAttendance())
    }

    render() {
        const attendanceList = this.props.allAttendanceData;
        const attendanceFields = ["user_id", "att_date", "clock_in", "clock_out", "leave_status"]
        return (
            <Box sx={{margin: 6}}>
                <CustomPaginationActionsTable data={attendanceList} fields={attendanceFields} buttons={[{type:"delete", callback:()=>{}}]} />
            </Box>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.attendance }
}

Attendance = connect(mapStateToProps)(Attendance);