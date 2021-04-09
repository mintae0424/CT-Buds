import { SET_RESTAURANTS, SET_CURRENT_RESTAURANT, ADD_RESTAURANT, ADD_CATEGORY, SET_CATEGORIES, ADD_MENU_ITEM } from '../actionTypes'

export const setRestaurants = (restaurants) => ({
    type: SET_RESTAURANTS,
    payload: restaurants
})

export const addRestaurant = (restaurant) => ({
    type: ADD_RESTAURANT,
    payload: restaurant
})

export const setCurrentRestaurant = (restaurant) => ({
    type: SET_CURRENT_RESTAURANT,
    payload: restaurant
})

export const addCategory = (category) => ({
    type: ADD_CATEGORY,
    payload: category
})

export const setCategories = (categories) => ({
    type: SET_CATEGORIES,
    payload: categories
})

export const addMenuItem = (item) => ({
    type: ADD_MENU_ITEM,
    payload: item
})

export const handleRestaurantError = (error) => {
    console.log(error)
}