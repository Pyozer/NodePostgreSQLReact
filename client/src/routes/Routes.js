import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { SignIn, SignUp } from '../pages/auth'
import { Dashboard, EditProfile } from '../pages/dashboard'
import { PageNotFound } from '../pages';

export const SignRoute = ({ match }) => (
    <Switch>
        <Route exact path={`${match.url}/signIn`} component={SignIn} />
        <Route exact path={`${match.url}/signUp`} component={SignUp} />
        <Route component={PageNotFound} />
    </Switch>
)
export const DashboardRoute = ({ match }) => (
    <Switch>
        <Route exact path={`${match.url}`} component={Dashboard} />
        <Route exact path={`${match.url}/edit`} component={EditProfile} />
        <Route component={PageNotFound} />
    </Switch>
)
