import { Alert, AlertTitle } from '@mui/material'
import React, { Component } from 'react'

export default class Message extends Component {
    render() {
        const {severity, title, message} = this.props.values;
        const display = this.props.display;
        const component = this.props.component;
        return (
            <Alert severity={severity} sx={{display: display, position: "absolute", bottom: 20, right: 20}} variant="filled" >
                <AlertTitle>
                    {title}
                </AlertTitle>
                {message}
            </Alert>
        )
    }
}
