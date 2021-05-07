import { combineReducers } from 'redux'
import authReducer from './authReducer'
import modalReducer from './modalReducer'
import preferenceReducer from './preferenceReducer'
import uiReducer from './uiReducer'
import restaurantReducer from './restaurantReducer'
import currentRestaurantReducer from './currentRestaurantReducer'
import cartReducer from './cartReducer'
import caloriesReducer from './calorieReducer'

export const rootReducer = combineReducers({
    authUser: authReducer,
    ui: uiReducer,
    preferences: preferenceReducer,
    modal: modalReducer,
    restaurants: restaurantReducer,
    currentRestaurant: currentRestaurantReducer,
    cart: cartReducer,
    calories: caloriesReducer,
})