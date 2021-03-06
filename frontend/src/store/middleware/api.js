import Axios from '../../lib/auth/Axios'
import AxiosNLP from '../../lib/auth/AxiosNLP'
import { toggleLoader } from '../actions/ui'

const API_REQUEST = 'API_REQUEST'
const NLP_REQUEST = 'NLP_REQUEST'

const dispatchToggleLoader = (dispatch, bool, { method, url }) =>
    dispatch(toggleLoader({ loaderVisible: bool, trigger: `${method} ${url}`}))

const makeRequest = (
    dispatch,
    { payload },
    { method, url, onSuccess, onError }
) => {
    switch(method){
        case('POST'):
            dispatchToggleLoader(dispatch, true, { method, url })
            return Axios
                .post(url, payload)
                .then((success) => {
                    dispatchToggleLoader(dispatch, false, { method, url })
                    onSuccess(success.data)
                })
                .catch(error => {
                    dispatchToggleLoader(dispatch, false, { method, url })
                    onError(error)
                })
        case('GET'):
            dispatchToggleLoader(dispatch, true, { method, url })
            return Axios
                .get(url, {params: payload})
                .then((success) => {
                    dispatchToggleLoader(dispatch, false, { method, url })
                    onSuccess(success.data)
                })
                .catch(error => {
                    dispatchToggleLoader(dispatch, false, { method, url })
                    onError(error)
                })
        case('DELETE'):
            dispatchToggleLoader(dispatch, true, { method, url })
            return Axios
                .delete(url, {params: payload})
                .then((success) => {
                    dispatchToggleLoader(dispatch, false, { method, url })
                    onSuccess(success.data)
                })
                .catch(error => {
                    dispatchToggleLoader(dispatch, false, { method, url })
                    onError(error)
                })
        default:
            return payload
    }
}


const makeNLPRequest = (
    dispatch,
    { payload },
    { method, url, onSuccess, onError }
) => {
    switch(method){
        case('GET'):
            dispatchToggleLoader(dispatch, true, { method, url })
            return AxiosNLP
                .get(url, {params: payload})
                .then((success) => {
                    dispatchToggleLoader(dispatch, false, { method, url })
                    onSuccess(success.data)
                })
                .catch(error => {
                    dispatchToggleLoader(dispatch, false, { method, url })
                    onError(error)
                })
        default:
            return payload
    }
}

export const apiMiddleware = ({ dispatch }) => next => action => {
    if (action.type === API_REQUEST){
        return makeRequest(dispatch, action, action.meta)
    } else if (action.type === NLP_REQUEST){
        return makeNLPRequest(dispatch, action, action.meta)
    }
    next(action)
}