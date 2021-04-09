import React from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { useAuth } from '../../hooks/queries/useAuth'

function PrivateRoute({ component: Component, ...rest }) {
    const { user } = useAuth()

    return (
        <Route
            {...rest}
            render = { props => 
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/' />
                )
            }
        />
    )
}

export default withRouter(PrivateRoute)