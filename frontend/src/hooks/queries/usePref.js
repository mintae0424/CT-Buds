import { useSelector } from 'react-redux'

export function usePref() {
    return useSelector(state => state.preferences);
}