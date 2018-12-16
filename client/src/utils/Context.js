import React from 'react'

const DEFAULT_TITLE = "Project"

export const PageTitle = ({ title, children }) => {
    document.title = (title ? `${title}  | ` : '') + DEFAULT_TITLE
    return children
}

export const LoginContext = React.createContext({
    isConnected: false,
    user: null,
    authToken: null,
    connectUser: (token, user) => { },
    updateUser: (user) => {},
    logoutUser: () => { },
})

export const ThemeContext = React.createContext({
    isDark: false,
    toggleTheme: () => { },
})

export default { PageTitle, LoginContext, ThemeContext }