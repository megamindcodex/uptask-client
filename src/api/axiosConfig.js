import axios from "axios";

// Create Axios Instance
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_ENDPOINT_URL, //base url, vuejs way of using .env
    timeout: 20000, // timeout in milliseconds
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})

export default apiClient