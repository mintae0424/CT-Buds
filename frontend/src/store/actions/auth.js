import { SET_USER, LOGOUT_USER } from '../actionTypes'

export const setUser = ({
    isAuthenticated= false,
    uid,
}) => ({
    type: SET_USER,
    payload: { isAuthenticated, uid }
})

export const handleLogout = () => ({
    type: LOGOUT_USER
})

export const handleAuthError = error => {
    console.log(error)
}