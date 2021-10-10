import { KeyboardReturn } from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../../features/user/userDetailSlice';

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
        this.dispatch(fetchCurrentUser())
            .unwrap()
            .then(promiseResult => {
                const [result, error] = promiseResult;
            });
    }
    render() {
        const userDetails = this.props.currentUserData;
        return (
            <>
                <IconButton
                    sx={{mb: 5}}
                    onClick={() => this.props.history.goBack()}>
                    <KeyboardReturn />
                </IconButton>
            <Box sx={{ p: 5 }}>
                <Stack direction="row" spacing={3}>
                    <Avatar
                        alt="user profile pricture"
                        src="https://thispersondoesnotexist.com/image"
                        variant="rounded"
                        sx={{ width: "25%", height: "auto" }} />
                    <Divider orientation="vertical" />
                    <Box sx={{
                        p:3,
                        lineHeight: "20px"
                    }}>
                        <Typography variant="h6">
                            ID: {userDetails.id} <br />
                            Name: {userDetails.name}
                        </Typography>
                        <Divider /><br/>
                        <Typography variant="body1">
                            Email: {userDetails.email} <br />
                            Contact: {userDetails.contact} <br />
                            role: {userDetails.role === 1 ? "SuperUser" : userDetails.role === 2 ? "Admin" : "User"}
                        </Typography>
                        <Divider /><br/>
                        <Typography variant="body2">
                            Gender: {userDetails.gender === 1 ? "Male" : "Female"}<br />
                            Salary: {userDetails.salary}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return { ...state.userDetail }
}

UserDetail = connect(mapStateToProps)(UserDetail);