import axios from "axios"
import {
    REACT_APP_API_BASE_URL,
    REACT_APP_API_TIMEOUT
} from "../ecosystem.config"

const API = axios.create({  
    baseURL: REACT_APP_API_BASE_URL,
    timeout: REACT_APP_API_TIMEOUT
})

export default API