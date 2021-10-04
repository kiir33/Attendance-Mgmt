import { Logout } from '@mui/icons-material'
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import auth from '../features/auth/auth'
import { toggleAuthenticated } from '../features/auth/authSlice'

export default class Header extends Component {
    render() {
        const dispatch = this.props.dispatch;
        const authenticated = this.props.authenticated;
        return (
            <Box>
                <AppBar position="static" color="light">
                    <Toolbar>
                        <Typography variant="h5" m="auto">
                            Your Logo
                        </Typography>
                        {
                            auth.isAuthenticated() &&
                            <IconButton
                                onClick={() => auth.logout(() => {
                                    this.props.history.push('/login');
                                    dispatch(toggleAuthenticated())
                                })}>
                                <Logout />
                            </IconButton>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.auth };
}

Header = connect(mapStateToProps)(Header);