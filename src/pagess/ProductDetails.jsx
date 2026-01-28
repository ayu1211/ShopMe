import React, { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import API from "../api";

export default function ProductDetails({cart ,setCart}) {

 
   const [products,setProducts] = useState(null)
   const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFav, setIsFav] = useState(false);
    const { id } = useParams();
     useEffect(() => {API.get(`/products/${id}`)
     .then(res => { setProducts(res.data);
                    setSelectedImage(res.data.images[0]);
     }
  )},[id])
 
  if(!products)
  return <div className="text-center py-20">Loading product...</div>; 

 const addToCart = () => {
    const existing = cart.find(i => i._id === products._id);
    if (existing) {
      setCart(cart.map(i => i._id === products._id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...products, qty: 1 }]);
    }
  };

  

  return (
   <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left Section: Images */}
      <div className="flex gap-4">
        {/* Thumbnails */}
        <div className="flex flex-col gap-3 overflow-y-auto h-[500px]">
          {products.images.map((img, idx) => (
            <img
              key={idx}
              src={`http://localhost:5000/${img}`}
              alt={products.name}
              onClick={() => setSelectedImage(img)}
              className={`w-16 h-16 object-cover rounded-lg cursor-pointer border ${
                selectedImage === img ? "border-gray-900" : "border-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={`http://localhost:5000/${selectedImage}`}
            alt={products.name}
            className="w-full max-h-[600px] object-contain rounded-xl"
          />
        </div>
      </div>

      {/* Right Section: Details */}
      <div className="flex flex-col justify-start gap-6">
        <div>
          <p className="text-red-500 font-medium">Sustainable Materials</p>
          <h1 className="text-3xl font-semibold text-gray-900 mt-1">{products.name}</h1>
          <p className="text-gray-700 mt-2 text-lg font-medium">
            ₹ {products.price.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Size Selection */}
        <div>
          <p className="font-semibold mb-2">Select Size</p>
          <div className="flex gap-3">
            {["S", "M", "L", "XL", "2XL"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-5 py-2 rounded-md border font-medium transition ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "border-gray-300 hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => addToCart(products)}
            className="bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-900 transition"
          >
            Add to Bag
          </button>
          <button
            onClick={() => setIsFav(!isFav)}
            className="border border-gray-400 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <HeartIcon
              className={`w-5 h-5 ${isFav ? "fill-red-500 text-red-500" : "text-gray-700"}`}
            />
            Favourite
          </button>
        </div>

        {/* Description */}
        <div className="text-gray-600 text-sm leading-relaxed">
          <p>{products.description}</p>
        </div>
      </div>
    </div>
  );
}