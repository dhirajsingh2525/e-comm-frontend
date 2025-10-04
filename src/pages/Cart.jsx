import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, increaseQuantity, removeCarts } from '../reducers/cartSlice';
import { Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
 const { items } = useSelector((state) => state.cartSlice)
 const dispatch = useDispatch();
 const navigate = useNavigate();


  const removeCart = (id) => {
     dispatch(removeCarts(id))
  }
  const subtotal = items.reduce((acc, num) => acc+num.totalPrice, 0)
  const shipping = items.length > 0 ? 10 : 0;
  const fee = items.length > 0 ? 20 : 0;

  const total = subtotal + shipping + fee;


  const navigateHandler = () => {
     navigate("/address")
  }


 

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Your Cart</h1>
            <p className="text-sm text-gray-500">{items.length} items</p>
          </div>
          <div className="text-sm text-gray-600">Need help? Contact support</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
          <section className="lg:col-span-2">

            <div className="space-y-4">
                          {items.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  Your cart is empty
                </div>
              )}
              
             {items.map((item) => (
     <div key={item.product_id} className="flex items-center bg-zinc-300 gap-4 p-4 border rounded-lg">
       <img src={item.image}
         alt=""
         className="w-24 h-24 object-cover rounded" />
    <div className="flex-1">
      <h3 className="font-medium">{item.title}</h3>
      <p className="text-sm text-gray-500">{item.description}</p>
      <div className="mt-3 flex items-center gap-3">
        <div className="flex items-center border rounded">
          <button onClick={()=> dispatch(decreaseQuantity(item.product_id))} className="px-3 py-1">-</button>
          <div className="px-4">{item.quantity}</div>
          <button onClick={()=> dispatch(increaseQuantity(item.product_id))} className="px-3 py-1">+</button>
        </div>
        <button onClick={() => removeCart(item.product_id)} className="text-sm text-red-500">Remove</button>
      </div>
    </div>
    <div className="text-right">
      <div className="font-semibold">₹{item.totalPrice}</div>
      <div className="text-sm text-gray-500">₹{item.price} each</div>
    </div>
  </div>
))}       
            </div>
          </section>

          
          <aside className="lg:col-span-1">
            <div className="p-4 border rounded-lg bg-zinc-300">
              <h2 className="text-lg font-medium mb-4">Cart Totals</h2>
              <div className="flex justify-between py-1"><span className="text-sm text-gray-600">subtotal</span><span>{subtotal}</span></div>
              <div className="flex justify-between py-1"><span className="text-sm text-gray-600">Shipping</span><span>{shipping}</span></div>
              <div className="flex justify-between py-1"><span className="text-sm text-gray-600">fee</span><span>₹
                 {fee}
                </span></div>
              <div className="border-t my-3" />
              <div className="flex justify-between items-center font-semibold text-lg"> <span>Total</span><span>₹{total}</span></div>

              <button 
               onClick={navigateHandler}
               className="mt-6 w-full bg-black  text-white py-3 rounded-lg">Proceed to Checkout</button>
              <button to="/" className="mt-3 w-full border border-gray-300 py-2 rounded-lg text-sm">Continue Shopping</button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default Cart
