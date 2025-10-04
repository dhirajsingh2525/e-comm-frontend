import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addSeller } from '../reducers/sellerSlice';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginSeller } from '../apis/AuthApis';

const SellerLogin = () => {
   const dispatch = useDispatch();
     const navigate = useNavigate();
     const [showPassword, setShowPassword] = useState(false);

      const togglePassword = () => {
      setShowPassword(prev =>!prev)
  }

    const {
            register,
            handleSubmit,
            formState: { errors },
          } = useForm();

           const onSubmit = async (data) => {
                      const payload = {
                      identifier: data.identifier, 
                      password: data.password,
                  };
                      try {
                const resData = await loginSeller(payload);
          
                if (resData) {
                   dispatch(addSeller(resData.seller))
                  console.log("Login success:", resData.seller);
                  navigate("/seller")
                 
                }
              } catch (err) {
                console.error(err);
              }
            };


  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-600">
  <div className="bg-white/30 backdrop-blur-xs flex w-[80%] shadow-yellow-600 p-8 rounded-2xl">
  <div className=''>
    <img className='w-1/2' src="https://i.pinimg.com/1200x/92/f2/98/92f2984ebd391d7e8c17a1e3cd673e46.jpg" alt="" />
  </div>

  <div className='flex flex-col w-1/2'>
    <h2 className="text-3xl font-bold text-center mb-4">Login as a Seller</h2>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email or Username */}
      <div>
        <label className="block text-gray-700">Email or Username</label>
        <input
          type="text"
          {...register("identifier", { required: true })}
          className="w-full px-3 py-2 border rounded-lg bg-white/70 backdrop-blur-sm"
        />
        {errors.identifier && (
          <p className="text-red-500">Email or Username is required</p>
        )}
      </div>

      {/* Password */}
      <div className='relative'>
        <label className="block text-gray-700">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          {...register("password", { required: true })}
          className="w-full px-3 py-2 border rounded-lg bg-white/70 backdrop-blur-sm"
        />
        {errors.password && (
          <p className="text-red-500">Password is required</p>
        )}
        <span
          className="absolute right-3 top-[70%] text-2xl cursor-pointer text-gray-600 -translate-y-1/2"
          onClick={togglePassword}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button 
        type="submit"
        className="w-full bg-yellow-600 text-white py-2 rounded-lg"
      >
        Login
      </button>
    </form>

    <p className="text-center border-1 border-zinc-600 rounded-lg hover:bg-zinc-600 py-1 text-sm text-gray-600 mt-4">
      <Link to="/seller/register" className="text-zinc-700 hover:text-white">
        create an account
      </Link>
    </p>
  </div>
</div>

    
  </div>
  )
}

export default SellerLogin