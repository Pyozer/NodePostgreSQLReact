import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { SignIn, SignUp } from '../pages/Auth';
import { Dashboard, EditProfile, NewProject, EditProject } from '../pages/Dashboard';
import { PageNotFound } from '../pages';
import AllUsers from '../pages/AllUsers';

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
        <Route exact path={`${match.url}/newproject`} component={NewProject} />
        <Route exact path={`${match.url}/editproject/:projectId`} component={EditProject} />
        <Route component={PageNotFound} />
    </Switch>
)

export const UsersRoute = ({ match }) => (
    <Switch>
        <Route exact path={`${match.url}`} component={AllUsers} />
        <Route component={PageNotFound} />
    </Switch>
)

export default { SignRoute, DashboardRoute, UsersRoute } 
