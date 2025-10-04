import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addSeller } from '../reducers/sellerSlice';
import { registerSeller } from '../apis/AuthApis';

const SellerRegister = () => {
   const dispatch = useDispatch();
   
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    const onSubmit = async (data) => {
    try {
      const payload = {
        username: data.username,
        email: data.email,
        fullname: {
          firstname: data.firstname,
          lastname: data.lastname,
        },
        password: data.password,
      };

      const resData = await registerSeller(payload);

      if (resData) {
        console.log("Seller Registered:", resData);
       dispatch(addSeller(resData.seller));
      }
    } catch (error) {
      console.log("Error in Seller Register:", error);
    }
  };


return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-purple-700">
      <div className="">
        <h2 className="text-xl font-bold text-center mb-2 text-gray-800">
          Register as Seller
        </h2>
      </div>

      <div className="bg-white shadow-lg shadow-purple-600 rounded-2xl p-8 w-[80%] flex items-center justify-center flex-col ">
        <div className="w-[50%]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                {...register("username", { required: true })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter username"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full px-3 py-2 border rounded-lg "
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                {...register("firstname", { required: true })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="First name"
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm">First name is required</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastname")}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Last name"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium "
            >
              Register as Seller
            </button>
          </form>
        </div>

        <p className="text-center border-1 border-zinc-600 rounded-lg hover:bg-purple-600 py-1 text-sm text-gray-600 mt-4 w-1/2">
                     <Link to="/seller/login" className="text-yellow-600 hover:text-white">
                      already have  an account
                     </Link>
                   </p>
      </div>
    </div>
  );

}

export default SellerRegister