import React from 'react'
import { Redirect, Route } from 'react-router'
import auth from '../features/auth/auth'
import SideBar from './SideBar'
import Header from './Header'
import { Grid } from '@mui/material'

export default function ProtectedRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => {
                
                if (auth.isAuthenticated()) {
                    // setCookie("token", getCookie("token"), 30);

                    return (
                        <>
                            <Grid container>
                                <Grid item md={2} sm={2}>
                                    <SideBar {...props} />
                                </Grid>
                                <Grid item md={10} sm={10}>
                                    <Header {...props} />
                                    <Component {...props} />
                                </Grid>
                            </Grid>

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
