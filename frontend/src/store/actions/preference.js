import { SET_PREFERENCES, ADD_PREFERENCE } from '../actionTypes'

export const setPreferences = (preferences) => ({
    type: SET_PREFERENCES,
    payload: preferences
})

export const addPreference = (preference) => ({
    type: ADD_PREFERENCE,
    payload: preference
})


export const handlePreferenceError = (error) => {
    console.log(error)
}