import { TOGGLE_MODAL } from '../actionTypes'

const initialState = {
    modalVisible: false,
}

export default function modalReducer(modalState = initialState, {payload, type}){
    switch(type){
        case TOGGLE_MODAL:
            return {
                ...modalState,
                modalVisible: payload.modalVisible
            }
        default:
            return modalState
    }
}