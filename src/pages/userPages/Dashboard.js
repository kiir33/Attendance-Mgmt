import { Button, Divider } from '@mui/material'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAttendance, postAttendance, patchAttendance } from '../../features/attendance/attendanceSlice';
import { gradientCollection, } from '../../utils/theme';
import { Paper, List, ListSubheader, ListItem, ListItemText, Typography, Box } from '@mui/material';

export default class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.dispatch = this.props.dispatch;
        this.userId = this.props.userDetail.currentUserData.id;
        this.state = {
            messageTitle: "",
            messageSeverity: "info",
            messageVisibility: "none",
        }
    }

    componentDidMount() {
        this.dispatch(getAttendance())
        console.log(this.props)
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

    latestAttendance = (list) => {
        return list[list.length - 1];
    }


    render() {
        const clockOut = true;
        const attendanceList = this.props.attendance.allAttendanceData
        return (
            <Box sx={{
                margin: 6
            }}>
                <h1>User DashBoard</h1>
                <Button
                    variant="contained"
                    sx={{
                        marginRight:6,
                    }}
                    onClick={() => {
                        this.clockOut(attendanceList) ?
                            this.dispatch(patchAttendance({ attId: this.latestAttendance(attendanceList).id, data: { user_id: this.userId } }))
                                .unwrap()
                                .then((promiseResult) => {
                                    const [result, error] = promiseResult;
                                    this.promiseHandler(error);
                                    this.dispatch(getAttendance())
                                })
                            :
                            this.dispatch(postAttendance({ user_id: this.userId }))
                                .unwrap()
                                .then((promiseResult) => {
                                    const [result, error] = promiseResult
                                    this.promiseHandler(error);
                                    this.dispatch(getAttendance(this.userId))
                                })
                    }}>
                    {this.clockOut(attendanceList) ? "Clock Out" : "Clock In"}
                </Button>
                <Link
                    to={{
                        pathname: "/newRequest",
                        state: {
                            method: "post",
                            from: this.props.location.path,
                        }
                    }}
                    style={{
                        textDecoration: "none",
                        color: "light"
                    }}
                >
                    <Button variant="contained"
                        sx={{
                            background: gradientCollection.gradientPurple.main,
                            "&:hover": {
                                transform: "scale(1.1)",
                            }
                        }}>
                        Schedule A Leave
                    </Button>
                </Link>

                <Paper
                sx={{
                    maxWidth: "30vw",
                    marginTop: 4
                }}>
                    <Link
                        to={{
                            pathname: "/attendance"
                        }}
                        style={{
                            textDecoration: "none",
                        }}>

                        <List
                            sx={{
                                minHeight: "200px",
                                minWidth: "200px",
                                
                                maxHeight: "60vh",
                                overflow: "auto"
                            }}
                            subheader={
                                <>
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Attendance History
                                </ListSubheader>
                                <Divider/>
                                </>
                            }>
                            {this.props.attendance.allAttendanceData.map((item, index) => {
                                return (
                                    <>
                                        <Divider />
                                        <ListItem key={index}>
                                            <ListItemText>
                                                <Typography variant="body1">
                                                    {`Date : ${item.att_date}`}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {`Clock In : ${item.clock_in?item.clock_in.slice(11,19): "---"}`}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {`ClockOut : ${item.clock_out? item.clock_out.slice(11,19): "---"}`}
                                                </Typography>
                                            </ListItemText>
                                        </ListItem>
                                        <Divider />
                                    </>
                                )
                            })}
                        </List>
                    </Link>
                </Paper>
            </Box>
        )
    }
};

const mapStateToProps = (state) => {
    return { userDetail: state.userDetail, attendance: state.attendance }
};

Dashboard = connect(mapStateToProps)(Dashboard);