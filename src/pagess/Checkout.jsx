import { useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import {useCheckout} from "../context/CheckoutContext.jsx"

export default function Checkout( ) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {cart,shippingAddress,setCart,paymentMethod} =useCheckout();


  const placeOrder = async () => {
    try {
      if(!shippingAddress){
        alert('Please enter shipping address first');
        navigate('/shipping');
        return;
      }
      if(!paymentMethod) {
        alert("Please select a payment method first");
        navigate('/payment');
        return;
      }
      
      const orderItems = cart.map(c => ({ product: c._id, qty: c.qty, price: c.price, name: c.name }));
      
      await API.post("/orders", { orderItems, shippingAddress, paymentMethod});
      alert("Order placed successfully!");
      setCart([]);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    }
  };
  if(!user) return <p> Please login to Checkout</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {shippingAddress ? ( 
        <div className='mb-4'>
        <h2> 
      <p> {shippingAddress.address}, {shippingAddress.city} , {shippingAddress.postalCode} , {shippingAddress.country}</p>
      <button onClick={()=> {navigate('/shipping')}} className='mt-2 text-blue-600 underline'>
        Edit Address
      </button>
      </h2>
      </div>
       
      ) : (
        <button onClick={()=>{navigate('/shipping')}} className="bg-blue-600 text-white py-2 px-4 rounded mb-4">
          Add Shipping Adress
        </button>
      )}
      <button onClick={placeOrder}
      className="bg-green-600 text-white px-4 py-2 rounded w-full">
        Place Order
      </button>
    </div>
  );
}
