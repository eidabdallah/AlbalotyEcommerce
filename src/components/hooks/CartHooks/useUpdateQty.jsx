import axios from 'axios';

export default function useUpdateQty(setData, token) {
    const updateQty = async (id, operator) => {
        setData(prevCart => {
            const currentItem = prevCart.products.find(item => item.productId._id === id);
            if (operator === "-" && currentItem.quantity === 1) return prevCart;

            axios.patch(`${import.meta.env.VITE_BURL}/cart/updateQuantity/${id}`, { operator, quantity: 1 },
                { headers: { Authorization: `${import.meta.env.VITE_BRAND_NAME}${token}` } })
                .catch(err => console.error("Failed to update quantity:", err));

            return {
                ...prevCart,
                products: prevCart.products.map(item =>
                    item.productId._id === id
                        ? { ...item, quantity: operator === "+" ? item.quantity + 1 : item.quantity - 1 }
                        : item
                )
            };
        });
    };

    return updateQty;
}
