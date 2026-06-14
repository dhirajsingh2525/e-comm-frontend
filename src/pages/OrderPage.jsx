import React, { useEffect, useState } from "react";
import { getOrderProduct } from "../apis/OrderApis";
import { Link, useLocation } from "react-router-dom";

const OrderPage = () => {
  const [myOrders, setMyOrders] = useState([]);
  const location = useLocation();
  const total = location.state?.total;

  const getOrder = async () => {
    const res = await getOrderProduct();
    setMyOrders(res.data.orders);
  };

  useEffect(() => {
    getOrder();
  }, []);

  const handlePayment = (order) => {
    console.log("Payment clicked for order:", order._id);
    alert(`Proceed to payment for order ${order._id} - Total: ${total}`);
  };

  return (
    <div className="orders-container w-full min-h-screen bg-[#161732]   p-6">
      <div className="w-full mb-6">
        <nav className="flex items-center text-gray-500 text-sm font-medium">
          <Link to="/profile" className="hover:text-blue-500 transition">
            My Account
          </Link>
          <i className="ri-arrow-right-s-line mx-2"></i>
          <h4 className="text-gray-700">My Orders</h4>
        </nav>
      </div>

      <div className="w-full h-[80vh] flex gap-6">
        <div className="orders-filter w-[25%] h-full shadow-lg rounded-2xl p-6 bg-zinc-300 border border-gray-200">
          <h3 className="text-lg font-semibold mb-5 text-gray-700">
            Filter by Status
          </h3>
          <div className="flex flex-col gap-4 text-gray-600">
            {["On the way", "Delivered", "Cancelled", "Returned"].map(
              (status, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition"
                >
                  <input type="checkbox" className="accent-blue-500 w-4 h-4" />
                  <span className="text-sm">{status}</span>
                </label>
              ),
            )}
          </div>
        </div>

        <div className="orders-list w-[75%] h-full overflow-y-auto shadow-lg rounded-2xl p-6 bg-zinc-300">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Your Orders ({myOrders.length})
          </h2>

          <div className="flex flex-col gap-6">
            {myOrders.map((order) => (
              <div
                key={order._id}
                className="order-card flex flex-col md:flex-row md:justify-between p-5 border border-gray-200 rounded-2xl shadow-sm bg-zinc-100 shadow-xl shadow-zinc-900"
              >
                {/* Products */}
                <div className="order-products flex flex-col gap-4 md:gap-3">
                  {order.products.map((item) => (
                    <div key={item._id} className="flex items-center gap-4">
                      <img
                        src={item.productId.images[0]}
                        alt=""
                        className="w-24 h-24 object-cover rounded-xl border border-gray-200"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800 text-md">
                          {item.productId.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          ₹{item.productId.price.amount}
                        </p>
                        <p className="text-gray-500 text-xs">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Details & Payment */}
                <div className="order-payment mt-4 md:mt-0 flex flex-col justify-between text-right">
                  <p className="font-medium text-gray-700">
                    Status: <span className="capitalize">{order.status}</span>
                  </p>
                  <p className="font-medium text-gray-700">Total: ₹{total}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Ordered on: {order.createdAt.slice(0, 10)}
                  </p>

                  <button
                    onClick={() => handlePayment(order)}
                    className="mt-4 w-full md:w-36 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
