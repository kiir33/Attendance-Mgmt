import { Typography, Stack } from '@mui/material'
import { Box } from '@mui/system'
import React, { Component } from 'react'
import image from '../../assets/404.jpg'

export default class Notfound extends Component {
    render() {
        return (
            <Stack sx={{backgroundColor: 'white'}} justifyContent="center">
                <Typography variant="h3" align="center">
                    Page not found
                </Typography>
                
                    <img src={image} alt="404 not found" />
               
            </Stack>
        )
    }
}
