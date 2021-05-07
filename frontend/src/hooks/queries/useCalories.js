import { useSelector } from 'react-redux'

export function useCalories() {
    return useSelector(state => state.calories);
}