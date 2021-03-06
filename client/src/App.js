import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import PageNotFound from './pages/PageNotFound'
import { LoginContext, ThemeContext } from './utils/Context'
import { Appbar } from './components/UI'
import { Home } from './pages'
import { SignRoute, DashboardRoute, UsersRoute } from './routes/Routes'
import { NotSecureRoute, SecureRoute } from './routes/CustomRoute'
import { getLocalAuthToken, getLocalUser, setLocalAuthToken, setLocalUser, isDarkTheme, setDarkTheme } from './utils/Storage'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isConnected: false,
      connectUser: this.connectUser,
      logoutUser: this.logoutUser,
      updateUser: this.updateUser,
      isDark: isDarkTheme(),
      toggleTheme: this.toggleTheme
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
    toast.success("You have been successfully disconnected.");
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

  toggleTheme = () => {
    const isDark = !this.state.isDark
    this.setState({ isDark })
    setDarkTheme(isDark)
  }

  render() {
    const { isDark } = this.state
    return (
      <ThemeContext.Provider value={this.state}>
        <LoginContext.Provider value={this.state}>
          <Router>
            <div className={`d-flex flex-column minh-100 pb-5 ${isDark ? 'darkTheme' : ''}`}>
              <Appbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <NotSecureRoute path="/auth" component={SignRoute} />
                <SecureRoute path="/dashboard" component={DashboardRoute} />
                <Route path="/users" component={UsersRoute} />
                <Route component={PageNotFound} />
              </Switch>
              <ToastContainer />
            </div>
          </Router>
        </LoginContext.Provider>
      </ThemeContext.Provider>
    )
  }
}

export default App
