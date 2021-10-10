import React from 'react'
import { Redirect, Route } from 'react-router'
import auth from '../features/auth/auth'
import SideBar from './SideBar'
import Header from './Header'
import { Box, Stack } from '@mui/material'

export default function ProtectedRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => {

                if (auth.isAuthenticated()) {

                    return (
                        <>
                            <Stack direction="row">
                                <Box >
                                    <SideBar {...props} />
                                </Box>
                                <Box >
                                    <Header {...props} />
                                    <Box>
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
