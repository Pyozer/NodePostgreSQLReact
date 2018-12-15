export const getLocalUser = () => JSON.parse(localStorage.getItem('user'))
export const setLocalUser = (user) => localStorage.setItem('user', user ? JSON.stringify(user) : null)

export const getLocalAuthToken = () => localStorage.getItem('authToken')
export const setLocalAuthToken = (authToken) => localStorage.setItem('authToken', authToken)