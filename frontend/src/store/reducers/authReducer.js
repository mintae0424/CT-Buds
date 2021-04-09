import { LOGOUT_USER, SET_USER, UPDATE_USER } from "../actionTypes"

const initialState = {
    isAuthenticated: false,
    user: null
}

export default function authReducer(authState = initialState, {payload, type}) {
    switch(type){
        case SET_USER:
            return {
                isAuthenticated: payload.isAuthenticated,
                user: payload.user
            }
        case LOGOUT_USER:
            return {
                isAuthenticated: false,
                user: null
            }
        case UPDATE_USER:
            return {
                ...authState,
                user: payload.user
            }
        default:
            return authState
    }
}