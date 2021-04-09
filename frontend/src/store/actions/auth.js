import { SET_USER, LOGOUT_USER, UPDATE_USER } from '../actionTypes'

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

export const updateUser = ({user}) => ({
    type: UPDATE_USER,
    payload: user
})

export const handleAuthError = error => ({
    type: "ERROR",
})