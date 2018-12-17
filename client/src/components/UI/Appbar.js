import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import Avatar from 'react-avatar'
import { LoginContext, ThemeContext } from '../../utils/Context'
import { Button } from '.'

const Appbar = ({ history }) => {
    return (
        <ThemeContext.Consumer>
            {({ isDark, toggleTheme }) => {
                const navType = isDark ? 'navbar-dark' : 'navbar-light'
                const themeIcon = isDark ? 'fas fa-lightbulb' : 'fas fa-moon'

                return (
                    <LoginContext.Consumer>
                        {({ isConnected, user, logoutUser }) => (
                            <nav className={`navbar navbar-expand-lg shadow ${navType}`}>
                                <div className="container">
                                    <Link className="navbar-brand mr-5" to="/">MyProject</Link>
                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>

                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav mr-auto">
                                            <li className="nav-item">
                                                <NavLink className="nav-link"  activeClassName="active font-weight-bold" to="/users">All users</NavLink>
                                            </li>
                                        </ul>
                                        <form className="form-inline">
                                            {isConnected ? (
                                                <div className="dropdown">
                                                    <button className="dropdown-toggle btn btn-transparent mx-3" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <Avatar name={user.nickname} round={true} size={40} className="shadow-sm" />
                                                        <span className="ml-3 mr-2"><strong>{user.nickname}</strong></span>
                                                    </button>

                                                    <div className="dropdown-menu shadow-lg" aria-labelledby="dropdownMenu2">
                                                        <Link to="/dashboard" className="dropdown-item">
                                                            <i className="fas fa-home mr-2"></i> Dashboard
                                                        </Link>
                                                        <Link to="/dashboard/edit" className="dropdown-item">
                                                            <i className="fas fa-user-edit mr-2"></i> Edit profile
                                                        </Link>
                                                        <button className="dropdown-item" type="button" onClick={() => toggleTheme()}>
                                                            <i className={`${themeIcon} mr-2`}></i> {isDark ? 'Light' : 'Dark'} theme
                                                        </button>
                                                        <div className="dropdown-divider"></div>
                                                        <button className="dropdown-item" type="button" onClick={() => {
                                                            logoutUser()
                                                            history.push('/')
                                                        }}>
                                                            <i className="fas fa-sign-out-alt mr-2"></i> Logout
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                    <>
                                                        <Link to="/auth/signUp" className="mr-1">
                                                            <Button className="mr-2">Sign Up</Button>
                                                        </Link>
                                                        <Link to="/auth/signIn">
                                                            <Button outline={true}>Sign In</Button>
                                                        </Link>
                                                    </>
                                                )}
                                        </form>
                                    </div>
                                </div>
                            </nav>
                        )}
                    </LoginContext.Consumer>
                )
            }}
        </ThemeContext.Consumer>

    )
}

export default withRouter(Appbar)