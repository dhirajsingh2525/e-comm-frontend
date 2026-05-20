import React, { useEffect, useState } from 'react';
import { Heart, Star, ShoppingCart, Truck, Shield, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetails } from '../apis/ProductApis';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../apis/PaymentApis';
import { addToCart } from '../reducers/cartSlice';
import { axiosInstance } from '../config/AxiosInstance';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDets, setproductDets] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const getProductDets = async () => {
    try {
      const res = await getProductDetails(id) 
      if(res){
        setproductDets(res)
      }
    } catch (error) {
      console.log("error in details page --->", error)
    }
  }
  useEffect(() => {
     getProductDets()
  }, [])
  

   const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % productDets?.images?.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + productDets?.images?.length) % productDets?.images?.length);
  };

  useEffect(() => {
    if(productDets){
      setTotalPrice(productDets?.price?.amount * quantity)
    }
  }, [productDets, quantity])
 

  const addToCartHandler = () => {
     dispatch(addToCart({
      product_id: productDets._id,
      title: productDets.title,
      description: productDets.description,
      image: productDets.images[0],
      price: productDets.price.amount,
      totalPrice: totalPrice,
      quantity: quantity
     }))
  }

  const handlePayment = async () =>{
    try {
       const orderData = {
      amount: totalPrice,
      currency: productDets?.price.currency,
      product_id: id,
      user_id: user._id 
    }
   const res = await createOrder(orderData);
     console.log(res)
   if(res){
    const options = {
       key: res.key_id,
       order_id: res.order.order_id,
       name: "e-commerce",
       description: "product purchasing",
       amount: productDets?.price?.amount,
       currency: productDets?.price?.currency,
       handler: async function (res) {
              let details = {
                razorpay_order_id: res.razorpay_order_id,
                razorpay_payment_id: res.razorpay_payment_id,
                razorpay_signature: res.razorpay_signature,
              };
          const resp = await axiosInstance.post("/payment/verify-payment", details)
           if(resp){
            console.log("successfull")
          }else{
            console.log("failed")
          }

       },
       prefill: {
        name: user.name,
        email: user.email,
        contact: "1234567890"
       },
      theme: {
        color: "#3399cc"
      }
    }
     const rzp = new window.Razorpay(options);
     rzp.open();
   }
   
   } catch (error) {
     console.log(error) 
    }
    
  }
  
  const handleOrder = async () => {
    navigate("/orderaddress", { state: {product: productDets, quantity: quantity }})
    
  }

  

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="lg:flex">
            <div className="lg:w-1/2 p-8">
              <div className="relative">
                <div className="relative bg-gray-100 rounded-2xl overflow-hidden mb-4 aspect-square">
                  <img
                    src={productDets?.images?.[selectedImageIndex]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  
                  {productDets?.images?.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                      </button>
                    </>
                  )}

               
                  {productDets?.price.discount && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      -{productDets?.price.discount}%
                    </div>
                  )}
                </div>

           
                {productDets?.images?.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto">
                    {productDets?.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index ? 'border-blue-500' : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${productDets?.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

          
            <div className="lg:w-1/2 p-8">
              <div className="flex flex-col h-full">
         
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">{productDets?.title}</h1> 
            
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">(4.2) · 156 reviews</span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600">Sold by</p>
                    <p className="font-semibold text-gray-900">Seller ID: 548t8tn4h884</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Verified Seller
                      </span>
                      <span>98% Positive Rating</span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-bold text-gray-900">{totalPrice}</span>
                    {productDets?.price.original && productDets?.price.original > productDets?.price.current && (
                      <span className="text-xl text-gray-500 line-through">${productDets?.price.original}</span>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{productDets?.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 font-semibold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-gray-600">Available: 23 in stock</span>
                  </div>

                  <div className="flex gap-4 mb-6">
                    <button 
                    onClick={addToCartHandler}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`p-3 border border-gray-300 rounded-lg transition-colors ${
                        isWishlisted ? 'bg-red-50 border-red-300 text-red-600' : 'hover:bg-gray-50'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <button 
                   onClick={handlePayment}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                    Pay Now
                  </button>
                   <button 
                   onClick={handleOrder}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                    Order Now
                  </button>
                </div>

                <div className="border-t pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Truck className="w-5 h-5 text-green-600" />
                      <span className="text-gray-600">Free shipping</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-600">2-year warranty</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <RefreshCw className="w-5 h-5 text-orange-600" />
                      <span className="text-gray-600">30-day returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;