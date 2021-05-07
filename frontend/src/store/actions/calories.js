import { SUGGEST_CALORIES, SET_TO_ZERO } from '../actionTypes'

export const suggestCalories = ({
    calories,
}) => ({
    type: SUGGEST_CALORIES,
    payload: calories
})

export const handleCalculateError = error => ({
    type: SET_TO_ZERO,
})