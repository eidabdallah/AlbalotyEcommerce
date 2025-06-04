import { useNavigate } from 'react-router-dom';
import useFetch from './../../../components/hooks/useFetch.jsx';
import Loading from './../../../components/shared/Loading/Loading.jsx';

export default function Cart() {
    // const token = localStorage.getItem("userToken");
    // if (!token) {
    //     return (<ErrorBox title="You are not logged in" message="Please log in to view your cart." />);
    // }
    // const { data, isLoading, error } = useFetch(`${import.meta.env.VITE_BURL}/cart`, true, { headers: { Authorization: `${import.meta.env.VITE_BRAND_NAME}${token}`, }, });

    // if (isLoading) return <Loading />;

    // if (error) {
    //     let message = "An error occurred while fetching your cart.";

    //     if (error.includes("jwt expired")) {
    //         message = "Your session has expired. Please log in again.";
    //     } else if (error.includes("jwt malformed")) {
    //         message = "Invalid token format. Please log in again.";
    //     } else if (error.includes("invalid signature")) {
    //         message = "Invalid token signature. Please log in again.";
    //     } else if (error.includes("Invalid token")) {
    //         message = "Invalid token. Please log in again.";
    //     }

    //     return <ErrorBox title="Authentication Error" message={message} />;
    // }

    // return (
    //     <div className="p-4">
    //         <h2>Cart Page</h2>
    //         {data?.cartItems?.length ? (
    //             <ul>
    //                 {data.cartItems.map((item) => (
    //                     <li key={item._id}>
    //                         {item.name} - Quantity: {item.quantity}
    //                     </li>
    //                 ))}
    //             </ul>
    //         ) : (
    //             <p>Your cart is empty.</p>
    //         )}
    //     </div>
    // );
}
