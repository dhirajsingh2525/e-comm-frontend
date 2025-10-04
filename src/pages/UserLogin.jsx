import React, { useState }  from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../reducers/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../apis/AuthApis";


const UserLogin = () => {
       const dispatch = useDispatch();
       const navigate = useNavigate();
       const [showPassword, setShowPassword] = useState(false);

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
      const resData = await loginUser(payload);
        console.log(resData,"resData")
      if (resData) {
         dispatch(addUser(resData.user))
        console.log("Login success:", resData.user);
        navigate("/")
       
      }
    } catch (err) {
      console.error(err);
    }
  };

  const togglePassword = () => {
      setShowPassword(prev =>!prev)
  }


return (
  <div className="flex items-center justify-center min-h-screen bg-sky-700">
    <div className="bg-white shadow-lg shadow-yellow-600 p-8 rounded-2xl shadow-lg w-[400px]">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email or Username</label>
          <input
            type="text"
            {...register("identifier", { required: true })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.identifier && (
            <p className="text-red-500">Email or Username is required</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block text-gray-700">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
                  <span
          className="absolute right-3 top-1/2 text-2xl cursor-pointer text-gray-600"
          onClick={togglePassword}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>


        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
        <p className="text-center text-sm text-gray-600 mt-4">
             Dont't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                register
              </Link>
            </p>
    </div>
  </div>
);
  
}

export default UserLogin