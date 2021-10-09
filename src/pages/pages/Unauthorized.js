import { Typography, Stack } from '@mui/material'
import React, { Component } from 'react'
import image from '../../assets/401.jpg'

export default class Notfound extends Component {
    render() {
        return (
            <Stack sx={{backgroundColor: 'white'}} justifyContent="center">
                <Typography variant="h3" align="center">
                    Not Authorized
                </Typography>
                
                    <img src={image} alt="401 not Authorized" />
               
            </Stack>
        )
    }
}
