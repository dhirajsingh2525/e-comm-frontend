import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isLoggedin: false,
  isLoading: true
}

export const userSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    addUser: (state,action) => {
        state.user = action.payload,
        state.isLoggedin = true,
        state.isLoading = false
    },
    removeUser: (state) =>{
       state.user = null,
       state.isLoggedin = false
    }
  },
})


export const { addUser,removeUser } = userSlice.actions
export default userSlice.reducer