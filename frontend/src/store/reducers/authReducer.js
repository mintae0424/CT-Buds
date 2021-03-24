import { SET_USER } from "../actionTypes"

const initialState = {
    isAuthenticated: false,
    uid: null
}

export default function authReducer(authState = initialState, {payload, type}) {
    switch(type){
        case SET_USER:
            return {
                isAuthenticated: payload.isAuthenticated,
                uid: payload.uid
            }
        default:
            return authState
    }
}