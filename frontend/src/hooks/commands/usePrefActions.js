import { useDispatch } from 'react-redux'
import { GET_ALL_PREFERENCES, CREATE_PREFERENCE } from '../../APIEndpoints'
import { apiRequest } from '../../store/actions/api'
import { setPreferences, addPreference, handlePreferenceError } from '../../store/actions/preference'

const getAllPref = dispatch => () => {
    dispatch(
        apiRequest({
            method: 'GET',
            url: GET_ALL_PREFERENCES,
            onSuccess: getPreferencesSuccess(dispatch),
            onError: getPreferencesError(dispatch)
        })
    )
}

const createPref = dispatch => preferenceData => {
    let prefObj = {
        category: preferenceData.category,
        name: preferenceData.preference
    }

    dispatch(
        apiRequest({
            method: 'POST',
            url: CREATE_PREFERENCE,
            payload: prefObj,
            onSuccess: createPreferenceSuccess(dispatch),
            onError: createPreferenceError(dispatch)
        })
    )
}

const getPreferencesSuccess = dispatch => (success) => {
    try {
        dispatch(setPreferences(success))
        return Promise.resolve(success)
    } catch (error) {
        dispatch(handlePreferenceError(error.response.data.message))
        return Promise.reject(error)
    }
}

const getPreferencesError = dispatch => ({ error }) => {
    dispatch(handlePreferenceError({error}))
}

const createPreferenceSuccess = dispatch => (success) => {
    try {
        dispatch(addPreference(success))
        return Promise.resolve(success)
    } catch (error) {
        dispatch(handlePreferenceError(error.response.data.message))
        return Promise.reject(error)
    }
}

const createPreferenceError = dispatch => ({ error }) => {
    dispatch(handlePreferenceError({error}))
}


export function usePrefActions() {
    const dispatch = useDispatch()

    return {
        getAllPref: getAllPref(dispatch),
        createPref: createPref(dispatch)
    }
}