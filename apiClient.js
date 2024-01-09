import axios from "axios"

const apiClient = axios.create({
    baseURL: "https://659ced75633f9aee790830e6.mockapi.io/",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
})

export default apiClient