import { useDispatch } from 'react-redux'
import { CALCULATE_CALORIES } from '../../APIEndpoints'
import { nlpRequest } from '../../store/actions/api'
import { suggestCalories, handleCalculateError } from '../../store/actions/calories'

const calculateCalories = dispatch => descriptions => {
    const URL = CALCULATE_CALORIES + "/" + descriptions
    console.log(URL)
    dispatch(
        nlpRequest({
            method: 'GET',
            url: URL,
            onSuccess: calculateSuccess(dispatch),
            onError: calculateError(dispatch)
        })
    )
}

const calculateSuccess = dispatch => (success) => {
    dispatch(
        suggestCalories({
            calories: success.calories
        })
    )
}

const calculateError = dispatch => (error) => {
    dispatch(handleCalculateError({ error }))
}

export function useCaloriesActions() {
    const dispatch = useDispatch()

    return {
        calculateCalories: calculateCalories(dispatch),
    }

}