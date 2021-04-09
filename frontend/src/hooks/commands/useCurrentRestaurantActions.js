import { useDispatch } from 'react-redux'
import { GET_CURRENT_RESTAURANT, ADD_CATEGORY, EDIT_CATEGORY, ADD_MENU_ITEM } from '../../APIEndpoints'
import { apiRequest } from '../../store/actions/api'
import { setCurrentRestaurant, addCategory, setCategories, addMenuItem, handleRestaurantError } from '../../store/actions/restaurant'

const getRestaurantById = dispatch => (id) => {
    dispatch(
        apiRequest({
            method: 'GET',
            url: GET_CURRENT_RESTAURANT,
            payload: id,
            onSuccess: getCurrentRestaurantSuccess(dispatch),
            onError: getCurrentRestaurantError(dispatch)
        })
    )
}

const createCategory = dispatch => (categoryObj) => {
    dispatch(
        apiRequest({
            method: 'POST',
            url: ADD_CATEGORY,
            payload: categoryObj,
            onSuccess: createCategorySuccess(dispatch),
            onError: createCategoryError(dispatch)
        })
    )
}

const editCategory = dispatch => (categoryObj) => {
    dispatch(
        apiRequest({
            method: 'POST',
            url: EDIT_CATEGORY,
            payload: categoryObj,
            onSuccess: editCategorySuccess(dispatch),
            onError: editCategoryError(dispatch)
        })
    )
}

const createMenuItem = dispatch => (menuItemObj) => {
    dispatch(
        apiRequest({
            method: 'POST',
            url: ADD_MENU_ITEM,
            payload: menuItemObj,
            onSuccess: createMenuItemSuccess(dispatch),
            onError: createMenuItemError(dispatch)
        })
    )
}


const getCurrentRestaurantSuccess = dispatch => (success) => {
    try {
        dispatch(setCurrentRestaurant(success))
        return Promise.resolve(success)
    } catch (error) {
        dispatch(handleRestaurantError(error.response.data.message))
        return Promise.reject(error)
    }
}

const getCurrentRestaurantError = dispatch => ({ error }) => {
    dispatch(handleRestaurantError({error}))
}

const createCategorySuccess = dispatch => (success) => {
    try {
        dispatch(addCategory(success))
        return Promise.resolve(success)
    } catch (error) {
        dispatch(handleRestaurantError(error.response.data.message))
        return Promise.reject(error)
    }
}

const createCategoryError = dispatch => ({ error }) => {
    dispatch(handleRestaurantError({error}))
}

const editCategorySuccess = dispatch => (success) => {
    try {
        dispatch(setCategories(success))
        return Promise.resolve(success)
    } catch (error) {
        dispatch(handleRestaurantError(error.response.data.message))
        return Promise.reject(error)
    }
}

const editCategoryError = dispatch => ({ error }) => {
    dispatch(handleRestaurantError({error}))
}

const createMenuItemSuccess = dispatch => (success) => {
    try {
        dispatch(addMenuItem(success))
        return Promise.resolve(success)
    } catch (error) {
        dispatch(handleRestaurantError(error.response.data.message))
        return Promise.reject(error)
    }
}

const createMenuItemError = dispatch => ({ error }) => {
    dispatch(handleRestaurantError({error}))
}

export function useCurrentRestaurantActions() {
    const dispatch = useDispatch()

    return {
        getRestaurantById: getRestaurantById(dispatch),
        createCategory: createCategory(dispatch),
        editCategory: editCategory(dispatch),
        createMenuItem: createMenuItem(dispatch)
    }
}