import { Link , useLocation,useNavigate} from "react-router-dom";
import { useContext , useEffect} from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { XMarkIcon , MagnifyingGlassIcon ,ShoppingCartIcon } from "@heroicons/react/16/solid";

export default function Navbar() {
    const [searchText,SetSearchText] = useState('');
    const {user,logout } = useContext(AuthContext); 
    const location = useLocation();
    const navigate = useNavigate();

    const handleClear = () => {
        SetSearchText('');
        navigate('/products');

    } 
    const hideSearch = location.pathname ==='/login' || location.pathname ==='/register'

    useEffect(()=>{   
      if(!hideSearch) {
        const params = new URLSearchParams();
        if(searchText.trim()) params.set("search",searchText.trim());
        navigate(`/products?${params.toString()}`);
      }

    },[searchText])





    return ( 
        <nav  className="bg-gray-50 text-gray-900 flex items-center justify-between px-6 py-4 shadow-md">
         <Link to="/" className="text-2xl font-extrabold">
        E-Shop
      </Link>
      { ( !hideSearch && 
      <div className="relative mx-6 w-1/3">
      <MagnifyingGlassIcon className="absolute left-2 h-5 w-5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input 
          type="text"
          placeholder="Search products..."
          value={searchText}
          className=" w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10 "
          onChange={(e)=> SetSearchText(e.target.value)}
        />


        { searchText && (
            <button onClick={handleClear}
            className= 'absolute right-2  top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition z-10'>
                <XMarkIcon className="h-5 w-5"/>
            </button>
        )
        }
      </div>
    )}
       <div className="flex gap-4" >
      
        <Link to="/cart"><ShoppingCartIcon className="w-5 h-5 text-gray-500 "/> </Link>
         {user ? (
            <>
            <span>Hello , {user.name} </span>
            <button onClick = {logout} className="bg-red-500 px-3 py-1 rounded"> LogOut </button>
            </>
        ) : (
            <>
                <Link to = "/login"> Login</Link>
                <Link to = "/register"> Register </Link>
            </>
        )}
       </div>
    
     </nav>
    ); 
}
