import { SET_RESTAURANTS, ADD_RESTAURANT } from '../actionTypes'

const initialState = {
    restaurants: []
}

export default function restaurantReducer(restaurantState = initialState, {payload, type}){
    switch(type){
        case SET_RESTAURANTS:
            return {
                ...restaurantState,
                restaurants: payload.restaurants
            }
        
        case ADD_RESTAURANT:
            let filteredRestaurants = restaurantState.restaurants.filter(restaurant => restaurant._id !== payload.restaurant._id)
            return {
                ...restaurantState,
                restaurants: [...filteredRestaurants, payload.restaurant]
            }

        default:
            return restaurantState
    }
}