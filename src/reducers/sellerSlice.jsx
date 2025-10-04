import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  seller: null,
  isSellerLoggedin: false
}

export const sellerSlice = createSlice({
  name: 'authseller',
  initialState,
  reducers: {
    addSeller: (state,action) => {
        state.seller = action.payload,
        state.isSellerLoggedin = true
    },
    removeSeller: (state) =>{
       state.seller = null,
       state.isSellerLoggedin = false
    }
  },
})


export const { addSeller,removeSeller } = sellerSlice.actions
export default sellerSlice.reducer