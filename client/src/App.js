import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound'
import { LoginContext } from './utils/Context'
import { Appbar } from './components/UI'
import { Home } from './pages'
import { SignRoute, DashboardRoute } from './routes/Routes'
import { NotSecureRoute, SecureRoute } from './routes/CustomRoute'
import { getLocalAuthToken, getLocalUser, setLocalAuthToken, setLocalUser } from './utils/Storage'

/*
1. Gérer persitance des données (localStorage)
  A. Enregister le token handleUser
  B. Recupérer quand refresh
  C. Remove token on logout

2. Créer page profile user + edit + remove

3. Créer user projects + edit + remove
*/

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isConnected: false,
      connectUser: this.connectUser,
      logoutUser: this.logoutUser,
      updateUser: this.updateUser
    }
  }

  componentWillMount() {
    this.connectUser(getLocalAuthToken(), getLocalUser())
  }

  connectUser = (token, user) => {
    if (token && user)
      this.updateLoginState(true, user, token)
  }

  logoutUser = () => {
    this.updateLoginState(false, null, null)
  }

  updateUser = (user) => {
    setLocalUser(user)
    this.setState({ user })
  }

  updateLoginState = (isConnected, user, authToken) => {
    setLocalAuthToken(authToken)
    setLocalUser(user)
    this.setState({ isConnected, user, authToken })
  }

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        <Router>
          <div className="d-flex flex-column minh-100">
            <Appbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <NotSecureRoute path="/auth" component={SignRoute} />
              <SecureRoute path="/dashboard" component={DashboardRoute} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </Router>
      </LoginContext.Provider>
    )
  }
}

export default App
