import { axiosInstance } from "../config/AxiosInstance";


export const registerUser = async (data) => {
     try {
          const res = await axiosInstance.post("/api/user/register", data)
          console.log(res.data,"res")
       if(res.status === 201){
        return res.data
       }
       console.log(res)
     } catch (error) {
        console.log("error in register",error)
     }
}

export const loginUser = async (data) => {
     try {
          const res = await axiosInstance.post("/api/user/login", data)
          console.log(res.data)
       if(res.status === 200){
        return res.data
       }
     } catch (error) {
        console.log("error in login",error)
     }
}
export const updateUser = async (data) => {
     try {
       const res = await axiosInstance.put("/api/update", data)
       if(res.status === 201){
        return res.data
       }
     } catch (error) {
        console.log("error in register",error)
     }
}

export const registerSeller = async (data) => {
     try {
          const res = await axiosInstance.post("/api/seller/register", data)
       if(res.status === 201){
        return res.data
       }
       console.log(res.data)
     } catch (error) {
        console.log("error in register",error)
     }
}

export const loginSeller = async (data) => {
     try {
          const res = await axiosInstance.post("/api/seller/login", data)
       if(res.status === 200){
        return res.data
       }
       console.log(res.data)
     } catch (error) {
        console.log("error in login",error)
     }
}

export const logoutAllUsers = async () =>{
   try {
      await axiosInstance.post("/api/auth/logout")
   } catch (error) {
      console.log(error)
   }
}