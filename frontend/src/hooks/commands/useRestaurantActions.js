import { useDispatch } from 'react-redux'
import { GET_ALL_RESTAURANTS, CREATE_RESTAURANT } from '../../APIEndpoints'
import { apiRequest } from '../../store/actions/api'
import { setRestaurants, addRestaurant, handleRestaurantError } from '../../store/actions/restaurant'

const getAllRestaurants = dispatch => () => {
    dispatch(
        apiRequest({
            method: 'GET',
            url: GET_ALL_RESTAURANTS,
            onSuccess: getRestaurantsSuccess(dispatch),
            onError: getRestaurantsError(dispatch)
        })
    )
}

const createRestaurant = dispatch => restaurantInfo => {
    dispatch(
        apiRequest({
            method: 'POST',
            url: CREATE_RESTAURANT,
            payload: restaurantInfo,
            onSuccess: createRestaurantSuccess(dispatch),
            onError: createRestaurantError(dispatch)
        })
    )
}

const getRestaurantsSuccess = dispatch => (success) => {
    try {
        dispatch(setRestaurants(success))
        return Promise.resolve(success)
    } catch (error) {
        dispatch(handleRestaurantError(error.response.data.message))
        return Promise.reject(error)
    }
}

const getRestaurantsError = dispatch => ({ error }) => {
    dispatch(handleRestaurantError({error}))
}

const createRestaurantSuccess = dispatch => (success) => {
    try {
        dispatch(addRestaurant(success))
        return Promise.resolve(success)
    } catch (error) {
        dispatch(handleRestaurantError(error.response.data.message))
        return Promise.reject(error)
    }
}

const createRestaurantError = dispatch => ({ error }) => {
    dispatch(handleRestaurantError({error}))
}


export function useRestaurantActions() {
    const dispatch = useDispatch()

    return {
        getAllRestaurants: getAllRestaurants(dispatch),
        createRestaurant: createRestaurant(dispatch)
    }
}