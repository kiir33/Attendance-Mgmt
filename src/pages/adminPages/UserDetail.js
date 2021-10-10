import { KeyboardReturn } from '@mui/icons-material';
import { Avatar, Box, Button, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Message from '../../component/Message';
import CustomPaginationActionsTable from '../../component/Table';
import { getUserAttendance, patchAttendance, postAttendance } from '../../features/attendance/attendanceSlice';
import { fetchUserDetail } from '../../features/user/userDetailSlice';

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
                messageVisibility: "block",
            })

        } else {
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
        const attendanceList = this.props.allAttendanceData;
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
                    <Paper>
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
                <Box sx={{margin: 2, marginBottom: 0}}>
                    <CustomPaginationActionsTable
                        data={attendanceList}
                        fields={attendanceFields}
                        buttons={[
                            {
                                type: "delete",
                                callback: () => { }
                            }
                        ]} />
                </Box>
                <Button
                    variant="contained"
                    sx= {{margin: 2}}
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
            </Box>
        )
    }
}
const mapStateToProps = (state) => {
    return { ...state.userDetail, ...state.attendance }
}

UserDetail = connect(mapStateToProps)(UserDetail);