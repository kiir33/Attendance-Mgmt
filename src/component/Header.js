import { Box, AppBar, Toolbar, Typography } from '@mui/material'
import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <Box>
                <AppBar position="static" color="light">
                    <Toolbar>
                        <Typography variant="h5" m="auto">
                            Your Logo
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }
}
