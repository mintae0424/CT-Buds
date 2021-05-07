import axios from 'axios'
import { API_URL, NLP_URL } from '../../APIEndpoints'


const Axios = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? API_URL : 'https://buds-backend.herokuapp.com/',
    timeout: 50000
})

const Axios_NLP = axios.create({
    baseURL: NLP_URL,
    timeout: 50000
})

export default Axios