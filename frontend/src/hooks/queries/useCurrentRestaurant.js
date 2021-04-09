import { useSelector } from 'react-redux'

export function useCurrentRestaurant() {
    return useSelector(state => state.currentRestaurant);
}