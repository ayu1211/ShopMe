
import {createContext,useContext,useState} from 'react';




const CheckoutContext = createContext();

export const useCheckout = () => useContext(CheckoutContext)

export const CheckoutProvider = ({children}) => {
    const [cart,setCart] =useState([]);
    const [shippingAddress,setShippingAddress]=useState(null);
    const [paymentMethod,setPaymentMethod]=useState(null);
    const [searchQuery,setSearchQuery] = useState('');

    return(
        <CheckoutContext.Provider 
            value= {{
                cart,
                setCart,
                shippingAddress,
                setShippingAddress,
                paymentMethod,
                setPaymentMethod,
                searchQuery,
                setSearchQuery
                

            }}
        >
        {children}
        </CheckoutContext.Provider>
    )
}