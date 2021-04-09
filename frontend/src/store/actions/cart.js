import { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_ALL, UPDATE_CART } from '../actionTypes'

export const addItem = ({
    item
}) => ({
    type: ADD_TO_CART,
    payload: { item }
})

export const removeItem = ({
    item
}) => ({
    type: REMOVE_FROM_CART,
    payload: { item }
})

export const update = ({
    cart
}) => ({
    type: UPDATE_CART,
    payload: { cart }
})

export const removeAll = () => ({
    type: REMOVE_ALL,
    payload: []
})