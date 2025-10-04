import { axiosInstance } from "../config/AxiosInstance"


export const orderProduct = async (data) => {
    try {
        const res =  axiosInstance.post("/api/order", data)
        return res
    } catch (error) {
        console.log("error in orders", error)
    }
   
}
export const getOrderProduct = async () => {
    try {
        const res =  axiosInstance.get("/api/order")
        return res
    } catch (error) {
        console.log("error in orders", error)
    }
   
}