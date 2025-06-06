import axios from 'axios';
import { useContext } from 'react';
import { CartContext } from './../../../Context/CartContext';
export default function useClearCart(setData, token) {
    const { setCartCount } = useContext(CartContext);
    const clearCart = async () => {
        try {
            await axios.patch(`${import.meta.env.VITE_BURL}/cart/clear`, {}, {
                headers: {
                    Authorization: `${import.meta.env.VITE_BRAND_NAME}${token}`
                }

            });
            setCartCount(0);
            setData(prev => ({
                ...prev,
                products: []
            }));
        } catch (err) {
            console.error("Failed to clear cart:", err);
        }
    };

    return clearCart;
}
