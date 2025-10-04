import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    items: JSON.parse(localStorage.getItem("item")) || []
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state,action) => {
           const isItemExits = state.items.find((item) =>
             item.product_id === action.payload.product_id) 
      
            if(isItemExits){
             isItemExits.quantity += action.payload.quantity 
             isItemExits.totalPrice += action.payload.totalPrice 
        }else{
            state.items.push(action.payload)
        }
         localStorage.setItem("item", JSON.stringify(state.items));

          },
        removeCarts: (state,action) => {
            state.items = state.items.filter((i) => i.product_id !== action.payload) 
            localStorage.setItem("item", JSON.stringify(state.items));
        },
        increaseQuantity: (state,action) => {
            const item = state.items.find((itm) => itm.product_id === action.payload)
            if(item){
            item.quantity += 1;
            item.totalPrice = item.quantity * item.price
            }
           localStorage.setItem("item", JSON.stringify(state.items));
        },
        decreaseQuantity: (state,action) => {
            const item = state.items.find((itm) => itm.product_id === action.payload)
            if(item && item.quantity > 1){
            item.quantity -= 1;
            item.totalPrice = item.quantity * item.price
            }
           localStorage.setItem("item", JSON.stringify(state.items));
        }
    }
})

export const { addToCart,removeCarts,increaseQuantity,decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;