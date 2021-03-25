import { SET_USER, LOGOUT_USER } from '../actionTypes'

export const setUser = ({
    isAuthenticated= false,
    user,
}) => ({
    type: SET_USER,
    payload: { isAuthenticated, user }
})

export const handleLogout = () => ({
    type: LOGOUT_USER
})

export const handleAuthError = error => {
    console.log(error)
}