import { createContext, useState, useEffect } from "react";
import useFetch from "../components/hooks/useFetch.jsx";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    const token = localStorage.getItem("userToken");
    const { data } = useFetch(
        `${import.meta.env.VITE_BURL}/cart`,
        true,
        { headers: { Authorization: `${import.meta.env.VITE_BRAND_NAME}${token}` } }
    );

    useEffect(() => {
        if (data?.count != null) {
            setCartCount(data.count);
        }
    }, [data]);

    return (
        <CartContext.Provider value={{ cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
