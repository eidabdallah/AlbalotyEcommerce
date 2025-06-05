import { useState } from 'react';
import useFetch from './../../../components/hooks/useFetch.jsx';
import Loading from './../../../components/shared/Loading/Loading.jsx';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Cart() {
    const token = localStorage.getItem("userToken");
    const { data, isLoading, error } = useFetch(
        `${import.meta.env.VITE_BURL}/cart`,
        true,
        { headers: { Authorization: `${import.meta.env.VITE_BRAND_NAME}${token}` } }
    );

    if (isLoading) return <Loading />;
    if (error) return <p className="text-danger">Error loading cart.</p>;

    const cartItems = data?.products || [];

    const totalPrice = cartItems.reduce((sum, item) => {
        const price = item.productId.price || 0;
        return sum + price * item.quantity;
    }, 0);

    return (
        <Container fluid className="p-4 bg-light min-vh-100">
            <Row className="shadow bg-white rounded-4 overflow-hidden">
                <Col lg={12} className="p-4">
                    <h4 className="mb-4 fw-bold">🛒 Shopping Cart</h4>

                    {cartItems.length > 0 ? (
                        <>
                            {cartItems.map((item) => (
                                <Row key={item._id} className="align-items-center py-3 border-bottom">
                                    <Col md={2}>
                                        <img
                                            src={item.productId.image || 'https://via.placeholder.com/100'}
                                            alt={item.productId.name}
                                            className="img-fluid rounded"
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <h6 className="mb-1">{item.productId.name}</h6>
                                    </Col>
                                    <Col md={3} className="d-flex align-items-center gap-2">
                                        <Button variant="outline-dark" size="sm">-</Button>
                                        <span className="px-2">{item.quantity}</span>
                                        <Button variant="outline-dark" size="sm">+</Button>
                                    </Col>
                                    <Col md={2}>
                                        <strong>€ {item.productId.price?.toFixed(2) || '0.00'}</strong>
                                    </Col>
                                    <Col md={2}>
                                        <Button variant="light" className="text-danger">×</Button>
                                    </Col>
                                </Row>
                            ))}

                            {/* Total Price */}
                            <Row className="justify-content-end pt-4">
                                <Col md={4}>
                                    <div className="d-flex justify-content-between border-top pt-3 fs-5 fw-bold">
                                        <span>Total:</span>
                                        <span>€ {totalPrice.toFixed(2)}</span>
                                    </div>
                                </Col>
                            </Row>

                            <div className="mt-4">
                                <Link to="/user" className="text-muted">← Back to shop</Link>
                            </div>
                        </>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
