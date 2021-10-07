import { Component } from 'react'
import CustomPaginationActionsTable from '../../component/Table'
import { getAllAttendance, patchAttendance, postAttendance } from '../../features/attendance/attendanceSlice';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import Message from '../../component/Message'


export default class Attendance extends Component {
    constructor(props) {
        super(props);
        this.dispatch = this.props.dispatch;
        this.location = this.props.location;
        this.state = {
            messageTitle: "",
            messageSeverity: "info",
            messageVisibility: "none",
            attendanceList: this.props.allAttendanceData
        }
    }

    componentDidMount() {
        this.dispatch(getAllAttendance())
    }

    inOutToggle(list) {
        if (list.length) {
            const latestAttendance = list[list.length - 1];
            return latestAttendance.clock_out;
        }

    }

    latestAttendance(list) {
        return list[list.length - 1];
    }


    promiseHandler(error){
        if (!error) {
            this.setState({
                messageTitle: "Attendance Successfully Recorded",
                messageSeverity: "info",
                messageVisibility: "block",
            })

        } else {
            console.log(error)
            this.setState({
                messageTitle: error.data.message,
                messageSeverity: "warning",
                messageVisibility: "block",
            })

        }
        setTimeout(() => {
            this.setState({
                messageTitle: "",
                messageSeverity: "info",
                messageVisibility: "none",
            })
        }, 5000)
    }
    render() {
        const attendanceList = this.props.allAttendanceData;
        let clockOut = this.inOutToggle(attendanceList);
        const attendanceFields = ["att_date", "clock_in", "clock_out", "leave_status"]
        return (
            <div>
                <h3>Attendance</h3>
                <Message values={{
                    severity: this.state.messageSeverity,
                    title: this.state.messageTitle,
                    message: "",
                }} 
                display= {this.state.messageVisibility}/>
                <CustomPaginationActionsTable data={attendanceList} fields={attendanceFields} buttons={["none"]} />
                <Button
                    variant="contained"
                    onClick={() => {
                        clockOut === null ?
                            this.dispatch(patchAttendance({ attId: this.latestAttendance(attendanceList).id }))
                                .unwrap()
                                .then((promiseResult) => {
                                    const [result, error] = promiseResult;
                                    this.promiseHandler(error);
                                    this.dispatch(getAllAttendance())
                                })
                            :
                            this.dispatch(postAttendance())
                            .unwrap()
                            .then((promiseResult)=>{
                                const [result, error] = promiseResult
                                this.promiseHandler(error);
                            })

                    }}>
                    {clockOut === null ? "Clock Out" : "Clock In"}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.attendance }
}

Attendance = connect(mapStateToProps)(Attendance);