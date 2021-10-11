import { Component } from 'react'
import CustomPaginationActionsTable from '../../component/Table'
import { getAttendance, patchAttendance, postAttendance } from '../../features/attendance/attendanceSlice';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import Message from '../../component/Message'
import { Box } from '@mui/system';


export default class Attendance extends Component {
    constructor(props) {
        super(props);
        this.dispatch = this.props.dispatch;
        this.location = this.props.location;
        this.state = {
            messageTitle: "",
            messageSeverity: "info",
            messageVisibility: "none",
        }
    }

    componentDidMount() {
        this.dispatch(getAttendance())
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
                messageVisibility: "flex",
            })

        } else {
            this.setState({
                messageTitle: error.data.message,
                messageSeverity: "warning",
                messageVisibility: "flex",
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
        const attendanceList = this.props.allAttendanceData.map(elem => {
            return{
                ...elem,
                clock_in: elem.clock_in !== null ? elem.clock_in.slice(11, 19) : null,
                clock_out: elem.clock_out !== null ? elem.clock_out.slice(11, 19) : null,
                leave_status: elem.leave_status? "on a leave" : "none"
            }
        });
        let clockOut = this.inOutToggle(attendanceList);
        const attendanceFields = ["att_date", "clock_in", "clock_out", "leave_status"]
        return (
            <Box sx={{
                p:5,
                maxWidth: "800px"
            }}>
                <h3>Attendance</h3>
                <Message values={{
                    severity: this.state.messageSeverity,
                    title: this.state.messageTitle,
                    message: "",
                }} 
                display= {this.state.messageVisibility}/>
                <CustomPaginationActionsTable data={attendanceList} fields={attendanceFields} buttons={[{type: "none"}]} />
                <br/>
                <Button
                
                    variant="contained"
                    onClick={() => {
                        clockOut === null ?
                            this.dispatch(patchAttendance({ attId: this.latestAttendance(attendanceList).id }))
                                .unwrap()
                                .then((promiseResult) => {
                                    const [result, error] = promiseResult;
                                    this.promiseHandler(error);
                                    this.dispatch(getAttendance())
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
            </Box>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.attendance }
}

Attendance = connect(mapStateToProps)(Attendance);