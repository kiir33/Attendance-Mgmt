import { Component } from 'react'
import { connect } from 'react-redux';
import { Box } from '@mui/system';
import { getAllAttendance } from '../../features/attendance/attendanceSlice';
import { getAllRequest } from '../../features/request/requestSlice';
import { fetchAllUsers } from '../../features/allUser/allUserSlice';
import { Card, CardContent, CardMedia, Divider, Icon, List, ListItem, ListItemText, ListSubheader, Paper, Stack, Typography } from '@mui/material';
import { Message, SupervisorAccount, Storage } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Unauthorized from '../pages/Unauthorized'


export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.dispatch = this.props.dispatch;
        this.state = {
            totalEmployees: 0,
            userHash: {},
            todayAttendance: [],
            absentToday: [],
            pendingRequest: [],
            noOfRequest: 0,
        }
    }
    componentDidMount() {
        this.dispatch(fetchAllUsers())
            .then(() => {
                this.dispatch(getAllAttendance())
                    .then(() => {
                        this.dispatch(getAllRequest())
                    });
            })
    }

    filterByToday(list) {
        const date = new Date();
        const today = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
        const filteredList = list.filter(elem => {
            return elem.att_date === today
        })
        return filteredList;
    }

    filterByPendingRequest(list) {
        return list.filter(elem => {
            return elem.approval_status === "pending";
        })
    }

    filterByOnLeaveToday(list) {
        return list.filter(elem => {
            return elem.leave_status;
        })
    }

    filterByAbsentToday(list) {
        return list.filter(elem => {
            return elem.clock_in === null;
        })
    }


    render() {
        if (this.props.userDetail.currentUserData.role >= 3) {
            return <Unauthorized />
        } else {
            return (
                <Box margin={5}>
                    <h1>AdminDashBoard</h1>
                    <Box sx={{
                        border: 1,
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        m: "40px 0px",
                        width: "740px"
                    }} >
                        <Card variant="outlined" sx={{ margin: 3 }}>
                            <Stack direction="row" alignItems="center">
                                <CardContent>
                                    <Typography variant="h6">
                                        {this.props.allUser.data.length}
                                    </Typography>

                                    <Typography variant="body2">
                                        Total Employees
                                    </Typography>
                                </CardContent>
                                <CardMedia sx={{ margin: 2 }}>
                                    <Icon>
                                        <SupervisorAccount />
                                    </Icon>
                                </CardMedia>
                            </Stack>
                        </Card>
                        <Card variant="outlined" sx={{ margin: 3 }}>
                            <Stack direction="row" alignItems="center">
                                <CardContent>
                                    <Typography variant="h6">
                                        {this.filterByPendingRequest(this.props.request.allRequestData).length}
                                    </Typography>

                                    <Typography variant="body2">
                                        Number of Requests
                                    </Typography>
                                </CardContent>
                                <CardMedia sx={{ margin: 2 }}>
                                    <Icon>
                                        <Message />
                                    </Icon>
                                </CardMedia>
                            </Stack>
                        </Card>
                        <Card variant="outlined" sx={{ margin: 3 }}>
                            <Stack direction="row" alignItems="center">
                                <CardContent>
                                    <Typography variant="h6">
                                        {this.state.absentToday.length}
                                    </Typography>

                                    <Typography variant="body2">
                                        absentToday
                                    </Typography>
                                </CardContent>
                                <CardMedia sx={{ margin: 2 }}>
                                    <Icon>
                                        <Storage />
                                    </Icon>
                                </CardMedia>
                            </Stack>
                        </Card>
                    </Box>
                    <Stack direction="row" spacing={3}>
                        <Paper>
                            <List
                                sx={{
                                    minHeight: "200px",
                                    minWidth: "200px"
                                }}
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        Absent Today
                                    </ListSubheader>
                                }>

                                {this.filterByAbsentToday(this.state.todayAttendance).map((item, index) => {
                                    return (
                                        <ListItem key={index}>
                                            <ListItemText>
                                                <Typography variant="body2">
                                                    {this.props.allUser.mapIdToName.user_id}
                                                </Typography>
                                            </ListItemText>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Paper>
                        <Divider orientation="vertical" />
                        <Paper>
                            <Link
                                to={{
                                    pathname: "/requests"
                                }}
                                style={{
                                    textDecoration: "none",
                                }}>

                                <List
                                    sx={{
                                        minHeight: "200px",
                                        minWidth: "200px"
                                    }}
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader">
                                            Pending Request
                                        </ListSubheader>
                                    }>
                                    {this.filterByPendingRequest(this.props.request.allRequestData).map((item, index) => {
                                        return (
                                            <ListItem key={index}>
                                                <ListItemText>
                                                    <Typography variant="body2">
                                                        {"> " + this.props.allUser.mapIdToName[item.user_id]}
                                                    </Typography>
                                                </ListItemText>
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </Link>
                        </Paper>
                    </Stack>
                </Box>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return { ...state }
}

Dashboard = connect(mapStateToProps)(Dashboard);