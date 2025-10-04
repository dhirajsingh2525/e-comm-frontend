import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateUser } from "../apis/AuthApis";
import { addUser } from "../reducers/userSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [users, setUsers] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
  });

  
  useEffect(() => {
    if (user) {  //redux me user load ho jaye tb user ka data print ho 
      setUsers({  // beacuse null print hoga console pe kyuki initilally null h user
        firstName: user.fullname.firstname || "",
        lastName: user.fullname.lastname || "",
        gender: user.gender || "",
        email: user.email || "",
        phone: user.mobile || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsers((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        fullname: { firstname: users.firstName, lastname: users.lastName },
        gender: users.gender,
        email: users.email,
        mobile: users.phone,
      };

      const updatedUser = await updateUser(payload); 
      
      if (updatedUser) {
        dispatch(addUser(updatedUser)); // Redux update
        alert("Profile updated successfully ✅");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update profile ❌");
    }
  };

  // Agar user abhi load nahi hua
  if (!user) {
    return <p className="text-center mt-20">Loading profile...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-6 gap-8">
      {/* Side Navigation */}
      <div className="w-full md:w-64 bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full mb-3"
          />
          <h2 className="font-bold text-xl">
            {users.firstName} {users.lastName}
          </h2>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-gray-700 mt-4">MY ORDERS</p>
          <Link to="/order-page" className="w-full text-left text-gray-600 hover:text-blue-600">
            Your Orders
          </Link>

          <p className="font-semibold text-gray-700 mt-4">ACCOUNT SETTINGS</p>
          <button className="w-full text-left text-gray-600 hover:text-blue-600">
            Profile Information
          </button>
          <Link to="/address" className="w-full text-left text-gray-600 hover:text-blue-600">
            Manage Addresses
          </Link>

          <p className="font-semibold text-gray-700 mt-4">MY STUFF</p>
          <button className="w-full text-left text-gray-600 hover:text-red-600 mt-2">
            Logout
          </button>
        </div>
      </div>

      {/* Main Profile Content */}
      <div className="flex-1 bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-600">First Name</label>
            <input
              type="text"
              name="firstName"
              value={users.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="font-medium text-gray-600">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={users.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        <div>
          <label className="font-medium text-gray-600">Gender</label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={users.gender === "male"}
                onChange={handleChange}
                className="accent-blue-600"
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={users.gender === "female"}
                onChange={handleChange}
                className="accent-pink-500"
              />
              Female
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-600">Email Address</label>
            <input
              type="email"
              name="email"
              value={users.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="font-medium text-gray-600">Mobile Number</label>
            <input
              type="text"
              name="phone"
              value={users.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="bg-yellow-400 w-1/2 text-black font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-200"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;








