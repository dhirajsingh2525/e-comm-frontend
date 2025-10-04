import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/AxiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { orderProduct } from "../apis/OrderApis";
import { useSelector } from "react-redux";



const OrderAddress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth);

  const singleProduct = location.state?.product;
  const quantity = location.state?.quantity


  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    pincode: "",
    state: "",
    city: "",
    fullAddress: "",
  })

  
  const fetchAddress  = async () => {
      try {
        const res = await axiosInstance.get("/api/user/address", { withCredentials: true });
        if (res.data.address) {
          setFormData(res.data.address); 
        }
      
      } catch (error) {
        console.log("No existing address", error);
      }
  }

  useEffect(() => {
    fetchAddress();
  }, []);



  const subtotal = singleProduct.price.amount * quantity
 
  const shipping = singleProduct? 10 : 0;
  const fee = singleProduct? 20 : 0;
  const total = subtotal + shipping + fee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createOrder = async () => {
    if (
    !formData.fullName ||
    !formData.phoneNumber ||
    !formData.email ||
    !formData.pincode ||
    !formData.state ||
    !formData.city ||
    !formData.fullAddress
  ) {
    alert("Please fill in all address fields before placing order");
    return;
  }
   const payload = {
    userId: user.user._id,
    products: [
     {
      productId: singleProduct._id,
      quantity: quantity
     }
   ]
   }

     const res = await orderProduct(payload)
    console.log(res.data)
    if(res){
    navigate("/order-page", { state: {total: total}})
   }
}

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/user/address", formData, { withCredentials: true });  
      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-start justify-center p-4 gap-6">
    
      <div className="w-[65%] bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-center text-3xl font-bold mb-4">
          {formData._id ? "Update Delivery Address" : "Add Delivery Address"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="px-4 py-3 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="px-4 py-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <textarea
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleChange}
            placeholder="Full Address (House No, Street, Area, City, Pincode...)"
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          ></textarea>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />

          <div className="flex justify-between gap-4 mt-4">
            <button
              type="button"
              className="w-1/2 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              {formData._id ? "Update & Continue" : "Save & Continue"}
            </button>
          </div>
        </form>
      </div>

   
      <div className="w-[30%] bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
       
            <div  className="space-y-3">
              <div className="flex justify-between">
                <span>{singleProduct.title}</span>
                <span>₹{singleProduct.price.amount}</span>
              </div>
            </div>
        
          <div className="flex justify-between border-t pt-2 mt-2 font-semibold">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Shipping</span>
            <span>₹{shipping}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Fee</span>
            <span>₹{fee}</span>
          </div>
          <div className="flex justify-between text-lg font-bold mt-2">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <button onClick={createOrder}
        className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderAddress;