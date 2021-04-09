import { useDispatch } from 'react-redux'
import { addItem, removeItem, removeAll, update } from '../../store/actions/cart'

export function useCartActions() {
    const dispatch = useDispatch()

    const addToCart = (item) => {
        dispatch(
            addItem({
                item: item,
            })
        )
    }
    
    const removeFromCart = (item) => {
        dispatch(
            removeItem({
                item: item
            })
        )
    }

    const updateCart = (cart) => {
        dispatch(
            update({
                cart: cart
            })
        )
    }

    const clearCart = () => {
        dispatch(
            removeAll()
        )
    }

    return { addToCart, removeFromCart, clearCart, updateCart }
}