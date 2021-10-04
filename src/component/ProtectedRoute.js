import React from 'react'
import { Redirect, Route } from 'react-router'
import auth from '../features/auth/auth'
import { getCookie, setCookie } from '../utils/cookies'

export default function ProtectedRoute({ component: Component, ...rest }) {

    return (
        <Route
            {...rest}
            render={props => {
                if (auth.isAuthenticated()) {
                    // setCookie("token", getCookie("token"), 30);
                    return <Component {...props} />;
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
