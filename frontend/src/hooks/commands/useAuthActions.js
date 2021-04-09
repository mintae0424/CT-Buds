import { useDispatch } from 'react-redux'
import { SET_USER_URL, UPDATE_PREFERENCE } from '../../APIEndpoints'
import setAuthToken from '../../lib/auth/setAuthToken'
import { apiRequest } from '../../store/actions/api'
import { setUser, handleLogout, updateUser, handleAuthError } from '../../store/actions/auth'

const authUser = dispatch => authState => {
    setAuthToken(authState.token)
    console.log(authState)
    dispatch(
        apiRequest({
            method: 'POST',
            url: SET_USER_URL,
            payload: authState.user,
            onSuccess: authSuccess(dispatch),
            onError: authError(dispatch)
        })
    )
}

const logoutUser = dispatch => () => {
    dispatch(
        handleLogout(dispatch)
    )
}

const authSuccess = dispatch => (success) => {
    dispatch(
        setUser({
            isAuthenticated: true,
            user: success.user
        })
    )
}

const authError = dispatch => (error) => {
    dispatch(handleAuthError({ error }))
}

const updatePreference = dispatch => (prefObj) => {
    dispatch(
        apiRequest({
            method: 'POST',
            url: UPDATE_PREFERENCE,
            payload: prefObj,
            onSuccess: updateSuccess(dispatch),
            onError: updateError(dispatch)
        })
    )
}

const updateSuccess = dispatch => (success) => {
    dispatch(
        updateUser({
            user: success
        })
    )
}

const updateError = dispatch => (error) => {
    dispatch(handleAuthError({ error }))
}

export function useAuthActions() {
    const dispatch = useDispatch()

    return {
        authUser: authUser(dispatch),
        logoutUser: logoutUser(dispatch),
        updatePreference: updatePreference(dispatch),
    }

}