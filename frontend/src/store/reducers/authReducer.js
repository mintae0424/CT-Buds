import { SET_USER } from "../actionTypes"

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
        default:
            return authState
    }
}