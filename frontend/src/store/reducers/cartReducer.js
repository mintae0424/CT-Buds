import { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_ALL, UPDATE_CART } from '../actionTypes'

const initialState = {
    cart: [],
}

export default function modalReducer(cartState = initialState, {payload, type}){
    switch(type){
        case ADD_TO_CART:
            return {
                ...cartState,
                cart: [...cartState.cart, payload.item]
            }
        case REMOVE_FROM_CART:
            let adjustedCart = cartState.cart.filter(i => i._id !== payload.item._id)
            return {
                ...cartState,
                cart: adjustedCart
            }
        case REMOVE_ALL:
            return {
                ...cartState,
                cart: []
            }
        case UPDATE_CART:
            console.log(payload)
            return {
                ...cartState,
                cart: payload.cart
            }
        default:
            return cartState
    }
}