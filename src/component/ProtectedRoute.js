import React from 'react'
import { Redirect, Route } from 'react-router'
import auth from '../features/auth/auth'
import SideBar from './SideBar'
import Header from './Header'
import { Grid, Box, Stack } from '@mui/material'

export default function ProtectedRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => {

                if (auth.isAuthenticated()) {
                    // setCookie("token", getCookie("token"), 30);

                    return (
                        <>
                            <Stack direction="row">
                                <Box sx={{ width: "15vw", minWidth:"180px" }}>
                                    <SideBar {...props} />
                                </Box>
                                <Box >
                                    <Header {...props} />
                                    <Box sx={{width:"85vw"}}>
                                        <Component {...props} />
                                    </Box>
                                </Box>
                            </Stack>

                        </>
                    );
                } else {
                    return (<Redirect
                        to={{
                            pathname: "/login",
                            state: {
                                from: props.location
                            }
                        }}
                    />)
                }
            }}
        />
    )
}
