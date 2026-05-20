import React from 'react';
import Mroutes from './mainroutes/Mroutes';
import { useEffect } from 'react';
import { axiosInstance } from './config/AxiosInstance';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from './reducers/userSlice';
import { addSeller, removeSeller } from './reducers/sellerSlice';
import Navbar from './components/Navbar';
import { useState } from 'react';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllUsers = async() => {
         try {
    const res = await axiosInstance.get("/api/auth/me")

     if(res.data.user.role === 'user'){
      dispatch(addUser(res.data.user))
        dispatch(removeSeller());
       }
    else if(res.data.user.role === 'seller'){
      dispatch(addSeller(res.data.user)) 
      dispatch(removeUser())
     }
   } catch (error) {
     console.log(error,"error in /auth/me")
   }
    }
    fetchAllUsers();
  }, [])
  
  return (
    <div>

      <Mroutes />
    </div>
  )
}

export default App