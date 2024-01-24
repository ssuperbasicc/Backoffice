import axios from "axios"
import {
    REACT_APP_API_BASE_URL,
    REACT_APP_API_TIMEOUT
} from "../ecosystem.config"

type Headers = {
    "Content-Type": string
    Authorization?: string
}

let headers: Headers = {
    "Content-Type": "application/json"
}

if (window.sessionStorage.getItem("token")) {
    headers = {
        ...headers,
        Authorization: `Bearer ${window.sessionStorage.getItem("token")}`
    }
}

const API = axios.create({  
    baseURL: REACT_APP_API_BASE_URL,
    timeout: REACT_APP_API_TIMEOUT,
    headers
})

export default API