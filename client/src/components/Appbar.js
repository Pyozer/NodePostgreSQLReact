import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { LoginContext } from '../utils/Context'
import Button from './Button';

const Appbar = ({ history }) => {
    return (
        <LoginContext.Consumer>
            {({ isConnected, logoutUser }) => (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
                    <div className="container">
                        <Link className="navbar-brand" to="/">MyProject</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link scale-effect" to="/">Home <span className="sr-only">(current)</span></Link>
                                </li>
                            </ul>
                            <form className="form-inline">
                                {isConnected ? (
                                    <>
                                        <Link to="/dashboard">
                                            <Button className="mr-2">Dashboard</Button>
                                        </Link>
                                        <Button
                                            onClick={() => {
                                                logoutUser()
                                                history.push('/')
                                            }}
                                            variant="danger"
                                            outline={true}>
                                            Logout
                                        </Button>
                                    </>
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
}

export default withRouter(Appbar)