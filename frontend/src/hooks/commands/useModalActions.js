import { useDispatch } from 'react-redux'
import { toggleModal } from '../../store/actions/modal'

export function useModalActions() {
    const dispatch = useDispatch()

    const toggleModalTrue = (modal) => {
        dispatch(
            toggleModal({
                modalVisible: modal,
            })
        )
    }

    const toggleModalFalse = () => {
        dispatch(
            toggleModal({
                modalVisible: '',
            })
        )
    }
    return { toggleModalTrue, toggleModalFalse }
}