import React, { Component } from 'react';

const DEFAULT_TITLE = "Project";

export class PageTitle extends Component {
    componentDidUpdate() {
        document.title = (this.props.title ? `${this.props.title}  | ` : '') + DEFAULT_TITLE;
    }

    render() {
        return this.props.children;
    }
};

export const LoginContext = React.createContext({
    isConnected: false,
    user: null,
    authToken: null,
    connectUser: (token, user) => { },
    logoutUser: () => { },
});

export default { PageTitle, LoginContext }