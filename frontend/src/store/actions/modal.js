import { TOGGLE_MODAL } from '../actionTypes'

export const toggleModal = ({
    modalVisible = false
}) => ({
    type: TOGGLE_MODAL,
    payload: { modalVisible }
})