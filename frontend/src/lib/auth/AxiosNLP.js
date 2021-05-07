import axios from 'axios'
import { NLP_URL } from '../../APIEndpoints'


const AxiosNLP = axios.create({
    baseURL: NLP_URL,
    timeout: 50000
})

export default AxiosNLP