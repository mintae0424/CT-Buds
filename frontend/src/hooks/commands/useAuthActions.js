import { useDispatch } from 'react-redux'
import { apiRequest } from '../../store/actionTypes'
import { setUser, handleLogout, handleAuthError } from '../../store/actions/auth'

export function useAuthActions() {
    const dispatch = useDispatch()

    const signinUser = (authState) => {
        dispatch(
            setUser({
                isAuthenticated: authState.isAuthenticated,
                user: authState.user,
            })
        )
    }

    const logoutUser = () => {
        dispatch(
            setUser({
                isAuthenticated: false,
                user: null,
            })
        )
    }

    return { signinUser, logoutUser }
}