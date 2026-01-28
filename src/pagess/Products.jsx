import { useEffect, useState } from "react";
import API from "../api";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { useCheckout} from '../context/CheckoutContext.jsx'

export default function Products() {
  const {cart,setCart} = useCheckout();
  const [addedItemId, setAddedItemId] = useState(null);
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const params = new URLSearchParams(location.search);
        const search = params.get("search") || "";
        const res = await API.get(`/products?search=${search}`);
        setProducts(res.data)
      } catch(err) {
        console.log("Failed to fetch products:",err);
      }
    }
      fetchProducts();
  }, [location.search]);

  const addToCart = (p) => {
    const existing = cart.find(i => i._id === p._id);
    if (existing) {
      setCart(cart.map(i => i._id === p._id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...p, qty: 1 }]);
    }
    setAddedItemId(p._id);
    setTimeout(()=> {setAddedItemId(null)},2000)
  };

  return (
    <div className="min-h-screen bg-white rounded-lg" > 
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map(p => (
        <ProductCard key={p._id} product={p} addToCart={addToCart} addedItemID = {addedItemId}/>
      ))}
    </div>
    </div>
  );
}
