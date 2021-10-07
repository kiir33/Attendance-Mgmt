import { KeyboardReturn } from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchUserDetail } from '../../features/user/userDetailSlice';

export default class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.userId = this.props.match.params.id;
        this.dispatch = this.props.dispatch;
        this.state = {
            error: "",
            userDetails: {},
        }
    }

    componentDidMount() {
        this.dispatch(fetchUserDetail(this.userId))
            .unwrap()
            .then(promiseResult => {
                const [result, error] = promiseResult;
                if (error) {
                    this.setState({
                        error,
                    });
                } else {
                    this.setState({
                        userDetails: { ...result.user }
                    });
                }
            });
    }
    render() {
        const userDetails = this.state.userDetails;
        return (
            <Box>
                <IconButton onClick={()=> this.props.history.push('/employees')}>
                    <KeyboardReturn/>
                </IconButton>
                <Stack direction="row" spacing={6}>
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
                            Gender: {userDetails.gender===1 ? "Male" : "Female"}<br />
                            Salary: {userDetails.salary}
                        </Typography>
                    </Paper>
                </Stack>
            </Box>
        )
    }
}
const mapStateToProps = (state) => {
    return { ...state.UserDetail }
}

UserDetail = connect(mapStateToProps)(UserDetail);