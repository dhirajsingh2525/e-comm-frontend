import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from '../reducers/userSlice'
 import  sellerSlice  from '../reducers/sellerSlice'
import errorSlice from "../reducers/errorSlice"
import cartSlice from "../reducers/cartSlice"


export const store = configureStore({
  reducer: {
    auth: userSlice,
    authSeller: sellerSlice,
    error: errorSlice,
    cartSlice: cartSlice
  }
})