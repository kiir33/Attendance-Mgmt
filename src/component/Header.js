import { Logout } from '@mui/icons-material'
import { Box, AppBar, Toolbar, Typography, IconButton, Icon, Stack } from '@mui/material'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import auth from '../features/auth/auth'
import gurzuLogo from "../assets/gurzuLogo.svg"

export default class Header extends Component {
    render() {
        const dispatch = this.props.dispatch;
        return (
            <Box>
                <AppBar position="static" color="light">
                    <Toolbar>
                            <Box sx={{flexGrow:1}}>
                                <img src={gurzuLogo} alt="Gurzu logo" width={120} />
                            </Box>
                            {
                                auth.isAuthenticated() &&
                                <IconButton
                                    onClick={() => auth.logout(() => {
                                        this.props.history.push('/login');
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