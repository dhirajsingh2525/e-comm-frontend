import axios from "axios";
import { store } from "../store/store";
import { setError } from "../reducers/ErrorSlice";



export const axiosInstance = axios.create({
    baseURL: "https://e-comm-backend-2-u9c3.onrender.com/",
    withCredentials: true 
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response && error.response.data && error.response.data.message){
            const message  = error.response.data.message

            store.dispatch(setError(message));
        }
        return Promise.reject(error);
    }
)