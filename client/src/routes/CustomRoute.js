import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { LoginContext } from '../utils/Context';

const AuthRoute = ({ component: Component, redirectTo, isSecure, ...rest }) => (
    <Route {...rest} render={props => (
        <LoginContext.Consumer>
            {({ isConnected }) => (
                isConnected === isSecure
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: redirectTo,
                        state: { from: props.location }
                    }} />
            )}
        </LoginContext.Consumer>
    )} />
)

export const NotSecureRoute = props => <AuthRoute {...props} redirectTo="/dashboard" isSecure={false} />

export const SecureRoute = props => <AuthRoute {...props} redirectTo="/auth/signin" isSecure={true} />

export default { NotSecureRoute, SecureRoute };