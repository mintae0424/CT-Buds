import { SET_PREFERENCES, ADD_PREFERENCE } from '../actionTypes'

const initialState = {
    preferences: {
        Allergy: [],
        Diet: [],
        Cuisine: [],
    }
}

export default function preferenceReducer(preferenceState = initialState, {payload, type}){
    switch(type){
        case SET_PREFERENCES:
            return {
                ...preferenceState,
                preferences: {
                    Allergy: payload.allergies,
                    Diet: payload.diets,
                    Cuisine: payload.cuisines
                }
            }
        
        case ADD_PREFERENCE:
            if (payload.category === "Allergy") {
                return {
                    ...preferenceState,
                    preferences: {
                        ...preferenceState.preferences,
                        Allergy: [...preferenceState.preferences.Allergy, payload.name]
                    }
                }
            } else if (payload.category === "Diet") {
                return {
                    ...preferenceState,
                    preferences: {
                        ...preferenceState.preferences,
                        Diet: [...preferenceState.preferences.Diet, payload.name]
                    }
                }
            } else if (payload.cateogry === "Cuisine") {
                return {
                    ...preferenceState,
                    preferences: {
                        ...preferenceState.preferences,
                        Cuisine: [...preferenceState.preferences.Cuisine, payload.name]
                    }
                }
            } else {
                return preferenceState
            }
            

        default:
            return preferenceState
    }
}