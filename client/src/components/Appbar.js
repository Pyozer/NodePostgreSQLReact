import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { LoginContext } from '../Context';

const Appbar = ({ history }) => {
    return (
        <LoginContext.Consumer>
            {({ isConnected, logoutUser }) => (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">MyProject</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                                </li>
                            </ul>
                            <form className="form-inline">
                                {isConnected ? (
                                    <>
                                        <Link to="/dashboard">
                                            <button className="btn btn-success mr-2" type="button">Dashboard</button>
                                        </Link>
                                        <button
                                            className="btn btn-outline-success"
                                            type="button"
                                            onClick={() => {
                                                logoutUser()
                                                history.push('/')
                                            }}>
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                        <>
                                            <Link to="/signUp" className="mr-1">
                                                <button className="btn btn-success mr-2" type="button">Sign Up</button>
                                            </Link>
                                            <Link to="/signIn">
                                                <button className="btn btn-outline-success" type="button">Sign In</button>
                                            </Link>
                                        </>
                                    )}
                            </form>
                        </div>
                    </div>
                </nav>
            )}
        </LoginContext.Consumer>

    );
};

export default withRouter(Appbar);