// import React from "react";
// import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addUser } from "../reducers/userSlice";
// import { registerUser } from "../apis/AuthApis";

// export default function Register() {
//     const dispatch = useDispatch();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();


//   const onSubmit = async (data) => {

//    try {
//             const payload = {
//       username: data.username,
//       email: data.email,
//       fullname: {
//         firstname: data.firstname,
//         lastname: data.lastname,
//       },
//       password: data.password,
//     };
//       const resData = await registerUser(payload);
          
//       if(resData){
//           console.log(resData.user)
//           dispatch(addUser(resData.user))
//       }

//    } catch (error) {
//      console.log(error)
//    }

//   };

//   return (
//     <div className="flex items-center justify-center flex-col min-h-screen bg-sky-700"> 
//     <div className="">
//          <h2 className="text-xl font-bold text-center mb-2 text-gray-800">
//           Register Your Account
//         </h2>
//     </div>
//       <div className="bg-white shadow-lg shadow-yellow-600 rounded-2xl p-8 w-[80%] flex items-center justify-center flex-col ">
//        <div className="w-[50%]">
//          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Username */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Username
//             </label>
//             <input
//               type="text"
//               {...register("username", { required: true })}
//               className="w-full px-3 py-2 border rounded-lg"
//               placeholder="Enter username"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               {...register("email", { required: true })}
//               className="w-full px-3 py-2 border rounded-lg "
//               placeholder="Enter email"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">Email is required</p>
//             )}
//           </div>

//           {/* First Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               First Name
//             </label>
//             <input
//               type="text"
//               {...register("firstname", { required: true })}
//               className="w-full px-3 py-2 border rounded-lg"
//               placeholder="First name"
//             />
//             {errors.firstname && (
//               <p className="text-red-500 text-sm">First name is required</p>
//             )}
//           </div>

//           {/* Last Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Last Name
//             </label>
//             <input
//               type="text"
//               {...register("lastname")}
//               className="w-full px-3 py-2 border rounded-lg"
//               placeholder="Last name"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               {...register("password", { required: true })}
//               className="w-full px-3 py-2 border rounded-lg"
//               placeholder="Enter password"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm">Password is required</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium "
//           >
//             Register
//           </button>
//         </form>
//        </div>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-600 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../reducers/userSlice";
import { registerUser } from "../apis/AuthApis";

export default function UserRegister() {
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
        gender: data.gender,
        mobile: data.mobile,
      };

      const resData = await registerUser(payload);

      if (resData) {
        console.log(resData.user);
        dispatch(addUser(resData.user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#161732] px-4 py-8">
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              {...register("username", { required: true })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter username"
            />
          </div>

    
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter email"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                {...register("firstname", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="First name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastname")}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Last name"
              />
            </div>
          </div>

      
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              {...register("mobile", { required: true, minLength: 10 })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter mobile number"
            />
          </div>

   
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Gender
            </label>
            <div className="flex items-center space-x-6 mt-2">
              <label className="flex items-center text-gray-700">
                <input
                  type="radio"
                  value="male"
                  {...register("gender", { required: true })}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center text-gray-700">
                <input
                  type="radio"
                  value="female"
                  {...register("gender", { required: true })}
                  className="mr-2"
                />
                Female
              </label>
            </div>
          </div>

    
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-medium shadow-md"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}


