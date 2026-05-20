import { axiosInstance } from "../config/AxiosInstance"


export const fetchAllProducts = async (search) =>{
    try {
          const response = await axiosInstance.get(`/?search=${search}`)

          if(response){
          return response.data.products
          }
    } catch (error) {
        console.log(error)
    }
}

export const getProductDetails = async (id) =>{
   try {
        const res =  await axiosInstance.get(`/product-details/${id}`)
       if(res){
       return res.data.product
       }
   } catch (error) {
      console.log(error);
   }
}

export async function createProduct(productData){
     try {
        const res = await axiosInstance.post("/api/product", productData, {
              headers: { 'Content-Type': 'multipart/form-data' }
     })
     return res.data;
     } catch (error) {
         console.log(error)
     }
}