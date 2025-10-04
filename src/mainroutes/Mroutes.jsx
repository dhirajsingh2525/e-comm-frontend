import React from 'react'
import { Routes,Route } from 'react-router-dom'
import UserRegister from '../pages/UserRegister'
import UserLogin from '../pages/UserLogin'
import Home from '../pages/Home'
import SellerRegister from '../pages/SellerRegister'
import SellerLogin from '../pages/SellerLogin'
import Cart from '../pages/Cart'
import UserProtectedRoute from '../components/UserProtectedRoute'
import ProductDetail from '../pages/ProductDetail'
import Seller from '../pages/Seller'
import Address from '../pages/Address'
import OrderPage from '../pages/OrderPage'
import OrderAddress from '../pages/OrderAddress'
import Profile from '../pages/Profile'

const Mroutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/register' element={<UserRegister />} />
            <Route path='/login' element={<UserLogin />} />
            <Route path='/seller/register' element={<SellerRegister />} />
            <Route path='/seller/login' element={<SellerLogin />} />
            <Route path='/' element={<Home />} />
            <Route path="/product-detail/:id" element={<ProductDetail  />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/address" element={<Address />} />
            <Route path="/order-page" element={<OrderPage />} />
            <Route path="/orderaddress" element={<OrderAddress />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/cart' element={ 
              <UserProtectedRoute>
               <Cart />
              </UserProtectedRoute>
              }/>
        </Routes>
    </div>
  )
}

export default Mroutes