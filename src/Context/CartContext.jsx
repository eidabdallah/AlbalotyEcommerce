import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
     useEffect(() => {
       getCart();
    }, []);
    const getCart = async()=>{
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`${import.meta.env.VITE_BURL}/cart`,{ headers: { Authorization:`${import.meta.env.VITE_BRAND_NAME}${token}` } });
        setCartCount(response.data.count);
    }
  

    return (
        <CartContext.Provider value={{ cartCount , setCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
