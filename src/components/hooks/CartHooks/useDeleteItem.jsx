import axios from 'axios';
import { useContext } from 'react';
import { CartContext } from './../../../Context/CartContext.jsx';
export default function useDeleteItem(setData, token) {
    const { cartCount , setCartCount} = useContext(CartContext);
    const deleteItem = async (id) => {
        try {
            await axios.patch(`${import.meta.env.VITE_BURL}/cart/${id}`, {}, {
                headers: {
                    Authorization: `${import.meta.env.VITE_BRAND_NAME}${token}`
                }


            });
            if(cartCount != 0){
                setCartCount(cartCount - 1);
            }
            setData(prevCart => ({
                ...prevCart,
                products: prevCart.products.filter(item => item.productId._id !== id)
            }));
        } catch (err) {
            console.error("Failed to delete item:", err);
        }
    };

    return deleteItem;
}
