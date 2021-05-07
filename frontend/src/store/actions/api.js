import { API_REQUEST, NLP_REQUEST } from '../actionTypes'

export const apiRequest = ({
    method = 'GET',
    url,
    payload = {},
    onSuccess,
    onError
}) => ({
    type: API_REQUEST,
    payload,
    meta: { method, url, onSuccess, onError }
})


export const nlpRequest = ({
    method = 'GET',
    url,
    payload = {},
    onSuccess,
    onError
}) => ({
    type: NLP_REQUEST,
    payload,
    meta: { method, url, onSuccess, onError }
})