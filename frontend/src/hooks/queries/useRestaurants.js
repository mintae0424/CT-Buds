import { useSelector } from 'react-redux'

export function useRestaurants() {
    return useSelector(state => state.restaurants);
}