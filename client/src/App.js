import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound'
import { LoginContext } from './Context'
import Appbar from './components/Appbar'
import { Home } from './pages'
import { SignRoute, DashboardRoute } from './routes/Routes'
import { NotSecureRoute, SecureRoute } from './routes/CustomRoute';

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
    this.state = { connectUser: this.connectUser, logoutUser: this.logoutUser, updateUser: this.updateUser }
  }

  componentDidMount() {
    this.updateLoginState(false, null, null)
    this.connectUser(
      localStorage.getItem('authToken'),
      JSON.parse(localStorage.getItem('user'))
    )
  }

  connectUser = (token, user) => {
    if (token && user) {
      localStorage.setItem('authToken', token)
      localStorage.setItem('user', JSON.stringify(user))
      this.updateLoginState(true, user, token)
    }
  }

  logoutUser = () => {
    localStorage.setItem('authToken', null)
    localStorage.setItem('user', null)
    this.updateLoginState(false, null, null)
  }

  updateUser = (user) => {
    this.setState({ user })
  }

  updateLoginState = (isConnected, user, authToken) => {
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
