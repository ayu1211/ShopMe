
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pagess/Products";
import ProductDetails from "./pagess/ProductDetails";
import Login from "./pagess/Login";
import Register from "./pagess/Register";
import Cart from "./pagess/Cart";
import Checkout from "./pagess/Checkout";
import ShippingAddress from "./pagess/ShippingAddress.jsx"; 
import { CheckoutProvider } from "./context/CheckoutContext.jsx";

function App() {
  return (
    <CheckoutProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 text-gray-900">
        
          <Navbar />

          
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path ="/products" element = {<Products />} />

          
            <Route path="/products/:id" element={<ProductDetails />} />

          
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/shipping" element={<ShippingAddress />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CheckoutProvider>
  );
}

export default App;
