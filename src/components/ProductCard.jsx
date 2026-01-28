import React from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { CheckIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, addToCart ,addedItemID}) {
   const isAdded = addedItemID === product._id
   const navigate = useNavigate();

   const goToDetails = ( )=>{ 
     navigate(`/products/${product._id}`);
   };


  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 px-4"
      whileHover={{ scale: 1.03 }}
    >
      <div  className="w-full h-56 flex items-center justify-center overflow-hidden "
            onClick = {goToDetails}>
        <img
          src={`http://localhost:5000/${product.images?.[0] || ""}`}
          alt={product.name}
          className="w-full h-full object-contain "
         
        />
       
      </div>
      <div className="p-4 flex flex-col gap-2" >
        <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
        <p className="text-gray-600 font-medium">${product.price}</p>
        <button
          onClick={() => addToCart(product)}
          disabled = {isAdded}
       className={`relative mt-2 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200
            ${isAdded ? "bg-green-500 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}
          `} 
        >
        <AnimatePresence mode='wait'>
          {isAdded ? (
            <motion.div key = "added"
            initial = {{opacity:0,scale:0.8}}
            animate= {{opacity:1,scale:1}}
            exit={{opacity:0,scale:0}}
            transition={{duration:0.2}}
            className='flex item-center gap-1'
            > 
            <CheckIcon className="w-5 h-5 text-white"/>
            <span>  Added</span>
            </motion.div>
          ): (
            <motion.span 
            key= "addtocart"
            initial= {{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition = {{duration:0.2}}
            > Add to Cart 



          </motion.span>)}
        </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}
