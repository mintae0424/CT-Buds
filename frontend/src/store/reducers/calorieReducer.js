import { SUGGEST_CALORIES, SET_TO_ZERO } from "../actionTypes"

const initialState = {
    calories: 0,
}

export default function caloriesReducer(calorieState = initialState, {payload, type}) {
    switch(type){
        case SUGGEST_CALORIES:
            console.log(payload)
            return {
                calories: payload,
            }
        case SET_TO_ZERO:
            return {
                calories: 0,
            }
        default:
            return calorieState
    }
}