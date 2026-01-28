import { Link } from "react-router-dom";
import { useCheckout } from "../context/CheckoutContext.jsx";

export default function Cart() {
  const {cart , setCart} = useCheckout();
  const remove = (id) => setCart(cart.filter(i => i._id !== id));
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="p-6">
      
      <div className="flex items-center gap-2 text-xl font-bold mb-4"> 
      
       </div>

      {cart.length === 0 ? ( 
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map(i => (
            <div key={i._id} className="flex justify-between items-center border-b py-2">
              <span>{i.name} x {i.qty}</span>
              <span>${i.price * i.qty}</span>
              <button onClick={() => remove(i._id)} className="text-red-500">Remove</button>
            </div>
          ))}
          <div className="mt-4 font-bold">Total: ${total.toFixed(2)}</div>
          <Link to="/checkout" className="bg-blue-600 text-white px-4 py-2 rounded mt-4 inline-block">
            Checkout
          </Link>
        </>
      )}
    </div>
  );
}
