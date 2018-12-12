import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { SignIn, SignUp } from '../pages/auth'
import { Dashboard, EditProfile } from '../pages/dashboard'

export const SignRoute = ({ match }) => (
    <>
        <Route exact path={`${match.url}/signIn`} component={SignIn} />
        <Route exact path={`${match.url}/signUp`} component={SignUp} />
    </>
)
export const DashboardRoute = ({ match }) => (
    <Switch>
        <Route exact path={`${match.url}/`} component={Dashboard} />
        <Route exact path={`${match.url}/edit`} component={EditProfile} />
    </Switch>
)
