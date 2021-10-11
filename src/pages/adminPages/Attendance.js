import { Component } from 'react'
import CustomPaginationActionsTable from '../../component/Table'
import { getAllAttendance, deleteAttendance } from '../../features/attendance/attendanceSlice';
import { fetchAllUsers } from '../../features/allUser/allUserSlice';
import { connect } from 'react-redux';
import { Box } from '@mui/system';
import Notfound from '../pages/Notfound';
import Message from '../../component/Message'

export default class Attendance extends Component {
    constructor(props) {
        super(props);
        this.dispatch = this.props.dispatch;
        this.location = this.props.location;
        this.state = {
            messageTitle: "",
            messageSeverity: "info",
            messageVisibility: "none"
        }
    }

    componentDidMount() {
        this.dispatch(getAllAttendance()).then(() => {
            this.dispatch(fetchAllUsers());
        })
    }


    promiseHandler = (result, error) => {
        if (!error) {
            this.setState({
                messageTitle: "Record Deleted",
                messageSeverity: "success",
                messageVisibility: "flex"
            })

        } else if (error.data.message) {
            this.setState({
                message: JSON.stringify(error.data.message),
                messageSeverity: "Warning",
                messageVisibility: "flex"
            })
        } else {
            this.setState({
                message: "oops!! Something Went Wrong",
                messageSeverity: "Warning",
                messageVisibility: "flex"
            })
        }
        setTimeout(() => {
            this.setState({
                message: "",
                messageSeverity: "info",
                messageVisibility: "none"
            })
        }, 5000)
    }

    render() {
        let attendanceList = this.props.allAttendanceData;
        if (attendanceList.length) {
            attendanceList = (attendanceList.map(elem => {
                return {
                    ...elem,
                    clock_in: elem.clock_in !== null ? elem.clock_in.slice(11, 19) : null,
                    clock_out: elem.clock_out !== null ? elem.clock_out.slice(11, 19) : null,
                    user_id: this.props.allUser.mapIdToName[elem.user_id],
                    leave_status: elem.leave_status? "on a leave" : "none"
                }
            })
            )
        }
        const attendanceFields = ["user_id", "att_date", "clock_in", "clock_out", "leave_status"]

        if (this.props.userDetail.currentUserData.role >= 3) {
            return <Notfound />
        } else {
            return (
                <Box sx={{ margin: 6 }}>
                    <Message values={{
                        title: this.state.messageTitle,
                        severity: this.state.messageSeverity
                    }}
                    display={this.state.messageVisibility}
                    />
                    <CustomPaginationActionsTable
                        data={attendanceList}
                        fields={attendanceFields}
                        buttons={[{ type: "delete", callback: (id) => { 
                            console.log(id)
                            this.dispatch(deleteAttendance(id))
                            .unwrap()
                            .then(promiseResult=> {
                                const [result, error] = promiseResult;
                                this.promiseHandler(result, error);
                                this.dispatch(getAllAttendance());
                            })
                        } }]} />
                </Box>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return { ...state.attendance, allUser: state.allUser, userDetail: state.userDetail }
}

Attendance = connect(mapStateToProps)(Attendance);