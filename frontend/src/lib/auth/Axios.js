import axios from 'axios'
import { API_URL } from '../../APIEndpoints'


const Axios = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? API_URL : '',
    timeout: 50000
})

export default Axios