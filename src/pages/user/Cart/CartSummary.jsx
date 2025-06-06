import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css';

export default function CartSummary({ totalPrice, hasItems }) {
    return (
        <>
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
                    <Link to="/user" className={`rounded-pill px-4 ${styles.darkBtn} text-decoration-none p-1 text-white fw-bold`}>
                        ← Continue Shopping
                    </Link>
                    <Button variant="dark" className={`rounded-pill px-4 ${styles.darkBtn} fw-bold`} disabled={!hasItems}>
                        Proceed to Checkout
                    </Button>
                </Col>
            </Row>
        </>
    );
}
