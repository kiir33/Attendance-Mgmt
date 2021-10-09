import { Component } from 'react'
import CustomPaginationActionsTable from '../../component/Table'
import { getAllAttendance } from '../../features/attendance/attendanceSlice';
import { fetchAllUsers } from '../../features/allUser/allUserSlice';
import { connect } from 'react-redux';
import { Box } from '@mui/system';
import Notfound from '../pages/Notfound';


export default class Attendance extends Component {
    constructor(props) {
        super(props);
        this.dispatch = this.props.dispatch;
        this.location = this.props.location;
    }

    componentDidMount() {
        this.dispatch(getAllAttendance()).then(() => {
            this.dispatch(fetchAllUsers());
        })
    }

    render() {
        let attendanceList = this.props.allAttendanceData;

        if (attendanceList.length) {
            attendanceList = (attendanceList.map(elem => {
                return {
                    ...elem,
                    clock_in: elem.clock_in.slice(11, 19),
                    clock_out: elem.clock_out !== null ? elem.clock_out.slice(11, 19) : null,
                    user_id: this.props.allUser.mapIdToName[elem.user_id],
                }
            })
            )
        }
        const attendanceFields = ["user_id", "att_date", "clock_in", "clock_out", "leave_status"]

        if(this.props.userDetail.currentUserData.role >= 3){
            return <Notfound/>
        }else{
            return (
                <Box sx={{ margin: 6 }}>
                    <CustomPaginationActionsTable data={attendanceList} fields={attendanceFields} buttons={[{ type: "delete", callback: () => { } }]} />
                </Box>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return { ...state.attendance, allUser: state.allUser, userDetail: state.userDetail }
}

Attendance = connect(mapStateToProps)(Attendance);