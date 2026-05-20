import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../reducers/userSlice";
import { removeSeller } from "../reducers/sellerSlice";
import { logoutAllUsers } from "../apis/AuthApis";
import { Search, ShoppingCart, User, Menu, X, Store } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({search, setSearch}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const { isLoggedin,user } = useSelector((state) => state.auth);
  const { isSellerLoggedin, seller } = useSelector((state) => state.authSeller);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const loggedin = isLoggedin || isSellerLoggedin;
  const allUsers = user || seller

  const logoutUser = () => {
    logoutAllUsers();
    dispatch(removeUser());
    dispatch(removeSeller());
  };

  const handleCartClick = () => {
    if (!loggedin && !allUsers) {
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MarketPlace</h1>
              <p className="text-xs text-gray-300 hidden sm:block">Premium Shopping</p>
            </div>
          </div>

          <div className="md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for products, brands and more..."
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 hover:bg-white/15"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-1.5 rounded-xl text-sm font-medium transition-colors duration-200">
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Home
            </Link>

            <button 
              onClick={handleCartClick}
              className="relative text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                3
              </span>
              <span className="ml-1 font-medium hidden lg:inline">Cart</span>
            </button>

          { !seller && !isSellerLoggedin ? (
                <Link
              to="/seller/login"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Sell on MarketPlace
            </Link>
             ) : (
                   <Link
              to="/seller"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Sell
            </Link>
            )
          }

            {!loggedin && !user ? (
              <Link
                to="/login"
                className="bg-white text-slate-900 px-6 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={logoutUser}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-3 pl-10 pr-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-800/95 backdrop-blur-md border-t border-white/10">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <Link to="/" className="block text-gray-300 hover:text-white py-2 font-medium transition-colors duration-200">
              Home
            </Link>
            
            <button 
              onClick={handleCartClick}
              className="flex items-center space-x-2 text-gray-300 hover:text-white py-2 font-medium transition-colors duration-200 w-full text-left"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart (3)</span>
            </button>

             {
            !seller && !isSellerLoggedin ? (
                <Link
              to="/seller/login"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Sell on MarketPlace
            </Link>
            ) : (
                   <Link
              to="/seller"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Sell
            </Link>
            )
          }

       
            {!loggedin && !user ? (
              <Link
                to="/login"
                className="bg-white text-slate-900 px-6 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={logoutUser}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;



