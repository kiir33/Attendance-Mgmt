import { Alert, AlertTitle, Box } from '@mui/material'
import React, { Component } from 'react'

export default class Message extends Component {
    render() {
        const { severity, title, message } = this.props.values;
        const display = this.props.display;
        return (
            <Box >
                <Alert severity={severity} sx={{ display: display, position: "fixed", bottom: 20, right: 20 , zIndex:9}} variant="filled" >

                    {title}

                    {message}
                </Alert>
            </Box>
        )
    }
}
