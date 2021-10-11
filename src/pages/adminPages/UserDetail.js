import { KeyboardReturn } from '@mui/icons-material';
import { Avatar, Box, Button, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Message from '../../component/Message';
import CustomPaginationActionsTable from '../../component/Table';
import { fetchAllUsers } from '../../features/allUser/allUserSlice';
import { deleteAttendance, getUserAttendance, patchAttendance, postAttendance } from '../../features/attendance/attendanceSlice';
import { deleteUser, fetchUserDetail } from '../../features/user/userDetailSlice';



export default class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.userId = this.props.match.params.id;
        this.dispatch = this.props.dispatch;
        this.state = {
            error: "",
            userDetails: {},
            messageTitle: "",
            messageSeverity: "info",
            messageVisibility: "none",
        }
    }

    componentDidMount() {
        this.dispatch(fetchUserDetail(this.userId))

        this.dispatch(getUserAttendance(this.userId))
    }


    promiseHandler(error) {
        if (!error) {
            this.setState({
                messageTitle: "Attendance Successfully Recorded",
                messageSeverity: "success",
                messageVisibility: "flex",
            })

        }else if(error.data){
            this.setState({
                messageTitle: error.data.message,
                messageSeverity: "warning",
                messageVisibility: "flex",
            })
        }
         else {
            this.setState({
                messageTitle: "oops!! Something Went Wrong",
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


    clockOut = (list) => {
        if (list.length) {
            return this.latestAttendance(list).clock_out === null
        }
    }

    latestAttendance(list) {
        return list[list.length - 1];
    }

    render() {
        const userDetails = this.props.data;
        const attendanceFields = ["att_date", "clock_in", "clock_out", "leave_status"]
        let attendanceList = this.props.allAttendanceData;
        attendanceList = attendanceList.map(elem => {
            return {...elem, leave_status: elem.leave_status? "on a leave" : "none"}
        })
        attendanceList = (attendanceList.map(elem => {
            return {
                ...elem,
                clock_in: elem.clock_in !== null ? elem.clock_in.slice(11, 19) : null,
                clock_out: elem.clock_out !== null ? elem.clock_out.slice(11, 19) : null,
                user_id: this.props.allUser.mapIdToName[elem.user_id],
            }
        })
        )
        return (
            <Box>
                <Message
                    values={{
                        severity: this.state.messageSeverity,
                        title: this.state.messageTitle
                    }}
                    display={this.state.messageVisibility}
                />
                <IconButton
                    sx={{ margin: 2 }}
                    onClick={() => this.props.history.push('/employees')}>
                    <KeyboardReturn />
                </IconButton>
                <Stack direction="row" spacing={2} margin={2}>
                    <Avatar
                        alt="user profile pricture"
                        src="https://thispersondoesnotexist.com/image"
                        variant="rounded"
                        sx={{ width: "15vw", height: "auto" }} />
                    <Divider orientation="vertical" />
                    <Paper sx={{
                        padding: 2
                    }}>
                        <Typography variant="h6">
                            ID: {userDetails.id} <br />
                            Name: {userDetails.name}
                        </Typography>
                        <Divider />
                        <Typography variant="body1">
                            Email: {userDetails.name} <br />
                            Contact: {userDetails.email} <br />
                            role: {userDetails.role === 1 ? "SuperUser" : userDetails.role === 2 ? "Admin" : "User"}
                        </Typography>
                        <Divider />
                        <Typography variant="body2">
                            Gender: {userDetails.gender === 1 ? "Male" : "Female"}<br />
                            Salary: {userDetails.salary}
                        </Typography>
                    </Paper>
                </Stack>
                <Box sx={{ margin: 2, marginBottom: 0 }}>
                    <Button
                        variant="contained"
                        sx={{ margin: 2, marginLeft: 0 }}
                        onClick={() => {
                            this.clockOut(attendanceList) ?
                                this.dispatch(patchAttendance({ attId: this.latestAttendance(attendanceList).id, data: { user_id: this.userId } }))
                                    .unwrap()
                                    .then((promiseResult) => {
                                        const [result, error] = promiseResult;
                                        this.promiseHandler(error);
                                        this.dispatch(getUserAttendance(this.userId))
                                    })
                                :
                                this.dispatch(postAttendance({ user_id: this.userId }))
                                    .unwrap()
                                    .then((promiseResult) => {
                                        const [result, error] = promiseResult
                                        this.promiseHandler(error);
                                        this.dispatch(getUserAttendance(this.userId))
                                    })
                        }}>
                        {this.clockOut(attendanceList) ? "Clock Out" : "Clock In"}
                    </Button>
                    <CustomPaginationActionsTable
                        data={attendanceList}
                        fields={attendanceFields}
                        buttons={[
                            {
                                type: "delete",
                                callback: (id) => {
                                    console.log(id)
                                    this.dispatch(deleteAttendance({attId: id}))
                                            .unwrap()
                                            .then(promiseResult => {
                                                const [result, error] = promiseResult;
                                                this.promiseHandler(error);
                                                this.dispatch(getUserAttendance(this.userId));
                                            })
                                }
                            }
                        ]} />
                </Box>
            </Box>
        )
    }
}
const mapStateToProps = (state) => {
    return { ...state.userDetail, ...state.attendance, allUser: state.allUser }
}

UserDetail = connect(mapStateToProps)(UserDetail);