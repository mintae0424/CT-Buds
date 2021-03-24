import { useDispatch } from 'react-redux'
import { apiRequest } from '../../store/actionTypes'
import { setUser, handleLogout, handleAuthError } from '../../store/actions/auth'

export function useAuthActions() {
    const dispatch = useDispatch()

    const signinUser = (authState) => {
        dispatch(
            setUser({
                isAuthenticated: authState.isAuthenticated,
                uid: authState.uid,
            })
        )
    }

    const logoutUser = () => {
        dispatch(
            setUser({
                isAuthenticated: false,
                uid: null,
            })
        )
    }

    return { signinUser, logoutUser }
}