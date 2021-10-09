import { Logout } from '@mui/icons-material'
import { Box, AppBar, Toolbar, IconButton, } from '@mui/material'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import auth from '../features/auth/auth'
import gurzuLogo from "../assets/gurzuLogo.svg"
import { resetUserDetail } from '../features/user/userDetailSlice'

export default class Header extends Component {
    render() {
        const dispatch = this.props.dispatch;
        return (
            <Box  sx={{ width: "100%", position:"relative"}}>
                <AppBar position="sticky" sx={{ width: "100%" }} color="light">
                    <Toolbar>
                        <Box sx={{ flexGrow: 1 }}>
                            <img src={gurzuLogo} alt="Gurzu logo" width={120} />
                        </Box>
                        {
                            auth.isAuthenticated() &&
                            <IconButton
                                onClick={() => auth.logout(() => {
                                    dispatch(resetUserDetail());
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
    return { auth: state.auth, userDetail: state.userDetail };
}

Header = connect(mapStateToProps)(Header);