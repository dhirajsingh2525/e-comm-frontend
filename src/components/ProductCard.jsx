import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product = {} }) => {
  const navigate = useNavigate();

 
  return (
    <article className="bg-purple-900  border-2 border-transparent hover:border-red-900 rounded-2xl p-4 flex flex-col shadow-sm hover:shadow-lg transition transform hover:-translate-y-1">
       <div className="relative rounded-xl shadow-2xl shadow-red-600 overflow-hidden h-52 bg-gray-100">
        <img
          onClick={() => navigate(`/product-detail/${product._id}`)}
          src={product.images[0]}
          alt=""
          className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
        />
        
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
          Price: {product.price.amount} {product.price.currency}
        </div>
       
        <div className={`absolute top-3 right-3 text-sm font-medium px-3 py-1 rounded-full shadow ${product?.stock > 0 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700'}`}>
          {product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between mt-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-300 line-clamp-2">{product?.title}</h3>
          <p className="text-gray-100 text-sm mt-2 line-clamp-3">{product?.description}</p>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => {/* placeholder for add to cart handler */}}
            disabled={product?.stock === 0}
            className={`flex-1 py-2 rounded-full text-white font-semibold transition ${product?.stock > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
          >
            Add to Cart
          </button>

          <button
            onClick={() => navigate(`/product-detail/${product._id}`)}
            className="px-3 py-2 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition"
          >
            View
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

