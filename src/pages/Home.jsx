import React, { useState, useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard";
import { fetchAllProducts } from "../apis/ProductApis";
import Subnav from "../components/Subnav";



export default function Home() {
  const [products, setProducts] = useState([]);
   const floatRef = useRef(null);


  const getAllProducts = async () => {
    try {
      const response = await fetchAllProducts();
      if (response) setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getAllProducts();
  }, []);



  


  const renderCategorySection = (category, id) => {

     const categoryProducts = products.filter((p) =>   p.category === category);
    if (categoryProducts.length === 0) return null;

    return (
      <section id={id} className="p-6 text-white bg-[#161732]">
        <h2 className="text-2xl font-bold mb-4  w-fit capitalize border-b-4 border-blue-500">{category}</h2>
        <div className="grid bg-[] grid-cols- sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div>
      
      <Subnav />

      {renderCategorySection("mobile", "mobile")}
      {renderCategorySection("clothes", "clothes")}
      {renderCategorySection("electronics", "electronics")}
      {renderCategorySection("laptop", "laptop")}
      {renderCategorySection("others", "others")}
    </div>
  );
}






