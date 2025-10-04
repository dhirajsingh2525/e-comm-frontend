import { axiosInstance } from "../config/AxiosInstance"


export const createOrder = async (data) => {
    try {
      const res = await axiosInstance.post("/payment/create-order", data)  
      if(res){
        return res.data
      }
    } catch (error) {
        console.log(error)
    }
}