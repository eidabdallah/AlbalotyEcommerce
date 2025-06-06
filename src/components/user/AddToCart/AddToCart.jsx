import usePost from '../../hooks/usePost.jsx';
import { useAuth } from './../../../Context/AuthContext';
import ToastMessage from './../../shared/ToastMessage/ToastMessage';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../../Context/CartContext.jsx';
export default function AddToCart({ productId }) {
    const navigate = useNavigate();
    const { cartCount , setCartCount} = useContext(CartContext);
    const { isGuest } = useAuth();
    const token = localStorage.getItem("userToken");
    const { postData, isLoading } = usePost(`${import.meta.env.VITE_BURL}/cart`);
    const handleClick = async () => {
        if (isGuest) {
            ToastMessage({ message: "Please log in to add products to your cart.", type: "info" });
            return;
        } 
        const res = await postData({ productId }, {
            headers: { Authorization: `${import.meta.env.VITE_BRAND_NAME}${token}` }
        });
        if (!res.success) {
            if (res.response.data.message === "invalid token" || res.response.data.message === "Unauthorized access" || res.error === "jwt malformed") {
                localStorage.removeItem("userToken");
                navigate("/" ,  { options: { replace: true } });
            }
            ToastMessage({ message: res.error, type: "error" });
        } else {
            setCartCount(cartCount + 1 );
            ToastMessage({ message: "Product added to cart!", type: "success" });
        }
    };


    return (

        <button className="btn fw-bold px-4 py-2 rounded-pill shadow-sm mb-4 fs-5 bg-warning" onClick={handleClick} style={isGuest ? { cursor: "not-allowed" } : {}} title={isGuest ? "Log in to add to cart" : ""}>
            {isLoading ? "Loading..." : "🛒 Add to Cart"}
        </button>
    );
}
