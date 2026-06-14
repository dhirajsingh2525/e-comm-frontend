import React, { useState } from "react";
import { MapPin, Package, User, UserRoundCog } from "lucide-react";
import { Link } from "react-router-dom";

const Subnav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="subnav bg-[#9810FA] border-t border-white/10 h-10 flex items-center justify-between px-6 text-sm relative">
      
      <div className="subnav-left flex gap-6 text-gray-300 ml-2 font-medium">
        <button onClick={() => handleScroll("mobile")} className="hover:text-white transition">
          Mobiles
        </button>
        <button onClick={() => handleScroll("clothes")} className="hover:text-white transition">
          Clothes
        </button>
        <button onClick={() => handleScroll("electronics")} className="hover:text-white transition">
          Electronics
        </button>
        <button onClick={() => handleScroll("laptop")} className="hover:text-white transition">
          Laptop
        </button>
        <button onClick={() => handleScroll("others")} className="hover:text-white transition">
          Others
        </button>
      </div>

      {/* My Account */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="subnav-right flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition"
      >
        <User className="w-4 h-4" />
        <span>My Account</span>
      </div>

      {isOpen && (
        <div className="absolute right-4 top-12 w-52 bg-white shadow-xl rounded-xl p-4 z-50 border border-gray-200">
          <div className="flex flex-col gap-3">
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition">
              <UserRoundCog className="w-5 h-5 text-purple-600" />
              <Link to="/profile" className="text-gray-700 font-medium">Settings</Link>
            </button>
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition">
              <MapPin className="w-5 h-5 text-green-600" />
              <Link to="/address" className="text-gray-700 font-medium">Update Address</Link>
            </button>
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition">
              <Package className="w-5 h-5 text-blue-600" />
              <Link to="/order-page" className="text-gray-700 font-medium">My Orders</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subnav;





