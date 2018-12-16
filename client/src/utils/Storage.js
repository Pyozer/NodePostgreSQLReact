export const getLocalUser = () => JSON.parse(localStorage.getItem('user'))
export const setLocalUser = (user) => {
    if (!user)
        localStorage.removeItem('user')
    else
        localStorage.setItem('user', JSON.stringify(user))
}

export const getLocalAuthToken = () => localStorage.getItem('authToken')
export const setLocalAuthToken = (authToken) => {
    if (!authToken)
        localStorage.removeItem('authToken')
    else
        localStorage.setItem('authToken', authToken)
}

export const isDarkTheme = () => localStorage.getItem('isDark') === 'true'
export const setDarkTheme = (isDark) => localStorage.setItem('isDark', isDark)