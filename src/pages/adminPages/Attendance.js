import { Component } from 'react'
import CustomPaginationActionsTable from '../../component/Table'
import { getAllAttendance } from '../../features/attendance/attendanceSlice';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
        const attendanceFields = ["user_Id", "att_date", "clock_in", "clock_out", "leave_status"]
        return (
            <div>
                <CustomPaginationActionsTable data={attendanceList} fields={attendanceFields} buttons={["none"]} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.attendance }
}

Attendance = connect(mapStateToProps)(Attendance);