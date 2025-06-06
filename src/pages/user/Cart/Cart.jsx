import useFetch from './../../../components/hooks/useFetch.jsx';
import Loading from './../../../components/shared/Loading/Loading.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Cart.module.css';
import CartItem from './CartItem.jsx';
import EmptyCartMessage from './EmptyCartMessage.jsx';
import AlertMessage from '../../../components/shared/Alert/Alert.jsx';
import CartTableHeader from './CartTableHeader.jsx';
import useUpdateQty from '../../../components/hooks/useUpdateQty.jsx';
import CartSummary from './CartSummary.jsx';
import useDeleteItem from '../../../components/hooks/useDeleteItem.jsx';

export default function Cart() {
    const token = localStorage.getItem("userToken");
    const { data, isLoading, error, setData } = useFetch(`${import.meta.env.VITE_BURL}/cart`, true, { headers: { Authorization: `${import.meta.env.VITE_BRAND_NAME}${token}` } });
    if (isLoading) return <Loading />;
    if (error && error !== "Cart not found") {
        return <AlertMessage color={"danger"} message={`Error : ${error}`} />
    }
    const updateQty = useUpdateQty(setData, token);
    const deleteItem = useDeleteItem(setData, token);

    const cartItems = data?.products || [];
    const totalPrice = cartItems.reduce((sum, item) => {
        const price = item.productId.finalPrice || 0;
        return sum + price * item.quantity;
    }, 0);
    return (
        <Container fluid className="py-5 bg-light min-vh-100">
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={9}>
                    <div className={`shadow ${styles.cartContainer}`}>
                        <h4 className="mb-4 fw-bold text-warning d-flex align-items-center">
                            <span className="me-2">🛒</span> Shopping Cart
                        </h4>
                        {cartItems.length > 0 ? (
                            <>
                                <CartTableHeader />
                                {cartItems.map((item) => (
                                    <CartItem key={item.productId._id} item={item} updateQty={updateQty} deleteItem={deleteItem} />
                                ))}
                                <CartSummary totalPrice={totalPrice} hasItems={cartItems.length > 0} />
                            </>
                        ) : (<EmptyCartMessage />)
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
