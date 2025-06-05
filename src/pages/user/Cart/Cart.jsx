import useFetch from './../../../components/hooks/useFetch.jsx';
import Loading from './../../../components/shared/Loading/Loading.jsx';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css';

export default function Cart() {
    const token = localStorage.getItem("userToken");
    const { data, isLoading, error } = useFetch(`${import.meta.env.VITE_BURL}/cart`, true, { headers: { Authorization: `${import.meta.env.VITE_BRAND_NAME}${token}` } });

    if (isLoading) return <Loading />;
    if (error && error !== "Cart not found") {
    return (
        <div className="d-flex justify-content-center align-items-center w-50 m-auto" style={{ height: '70vh' }}>
            <Alert variant="danger" className="text-center fw-bold shadow-sm w-75">
                ⚠️ Error: {error}
            </Alert>
        </div>
    );
}

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
                                <Row className="d-none d-md-flex fw-bold border-bottom pb-2 text-center">
                                    <Col md={2}>Image</Col>
                                    <Col md={2}>Product</Col>
                                    <Col md={2}>Quantity</Col>
                                    <Col md={2}>Unit Price</Col>
                                    <Col md={1}>Total</Col>
                                    <Col md={1}></Col>
                                </Row>

                                {cartItems.map((item) => (
                                    <Row
                                        key={item._id}
                                        className={`align-items-center py-3 border-bottom text-center ${styles.rowHover}`}
                                    >
                                        <Col xs={12} md={2} className="mb-2 mb-md-0">
                                            <img
                                                src={item.productId.mainImage.secure_url}
                                                alt={item.productId.name}
                                                className={`img-fluid rounded ${styles.imageHover}`}
                                                style={{ objectFit: 'cover', width: '120px', maxHeight: '120px' }}
                                            />
                                        </Col>

                                        <Col xs={5} md={2} className="mb-2 mb-md-0">
                                            <h6 className="mb-1 text-dark fw-semibold">{item.productId.name}</h6>
                                        </Col>

                                        <Col xs={5} md={2} className={`d-flex justify-content-center align-items-center gap-2 ${styles.quantityControls}`}>
                                            <Button variant="outline-secondary" size="sm" className={styles.roundedCircle}>-</Button>
                                            <span className="fw-medium">{item.quantity}</span>
                                            <Button variant="outline-secondary" size="sm" className={styles.roundedCircle}>+</Button>
                                        </Col>

                                        <Col xs={6} md={2}>
                                            <strong className="text-dark">
                                                € {item.productId.finalPrice?.toFixed(2) || '0.00'}
                                            </strong>
                                        </Col>

                                        <Col xs={6} md={1}>
                                            <strong className="text-dark">
                                                € {(item.productId.finalPrice * item.quantity).toFixed(2) || '0.00'}
                                            </strong>
                                        </Col>

                                        <Col xs={12} md={1}>
                                            <Button variant="danger" className="fs-6 fw-bold mt-2 mt-md-0" title="Remove item">
                                                DELETE
                                            </Button>
                                        </Col>
                                    </Row>
                                ))}

                                <Row className="justify-content-end pt-4">
                                    <Col xs={12} md={5}>
                                        <div className={`d-flex justify-content-between ${styles.totalPriceBox} text-dark`}>
                                            <span>Total:</span>
                                            <span>€ {totalPrice.toFixed(2)}</span>
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="mt-4">
                                    <Col className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                        <Link
                                            to="/user"
                                            className={`rounded-pill px-4 ${styles.darkBtn} text-decoration-none p-1 text-white fw-bold`}
                                        >
                                            ← Continue Shopping
                                        </Link>
                                        <Button
                                            variant="dark"
                                            className={`rounded-pill px-4 ${styles.darkBtn} fw-bold`}
                                            disabled={cartItems.length === 0}
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    </Col>
                                </Row>
                            </>
                        ) : (
                            <div className="text-center py-5">
                                <Alert variant="warning" className="fw-bold shadow-sm mb-4 w-50 m-auto">
                                    🛒 Your cart is empty. Start adding some items!
                                </Alert>
                                <Link to="/user" className="btn btn-warning rounded-pill px-4 py-2 fw-bold">
                                    Start Shopping
                                </Link>
                            </div>
                        )
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
