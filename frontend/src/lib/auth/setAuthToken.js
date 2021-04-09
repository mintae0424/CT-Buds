import Axios from './Axios'

const setAuthToken = token => {
    if (token) {
        console.log("inside setauthtoken", token)
        Axios.defaults.headers.common['Authorization'] = token
    } else {
        delete Axios.defaults.headers.common['Authorization']
    }
}

export default setAuthToken