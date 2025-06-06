import { Row, Col, Button } from 'react-bootstrap';
import styles from './Cart.module.css';

export default function CartItem({ item, updateQty , deleteItem }) {
    return (
        <Row className={`align-items-center py-3 border-bottom text-center ${styles.rowHover}`}>
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
                <Button variant="outline-secondary" size="sm" className={styles.roundedCircle} onClick={() => updateQty(item.productId._id, "-")}>-</Button>
                <span className="fw-medium">{item.quantity}</span>
                <Button variant="outline-secondary" size="sm" className={styles.roundedCircle} onClick={() => updateQty(item.productId._id, "+")}>+</Button>
            </Col>

            <Col xs={6} md={2}>
                <strong className="text-dark">€ {item.productId.finalPrice?.toFixed(2) || '0.00'}</strong>
            </Col>

            <Col xs={6} md={1}>
                <strong className="text-dark">€ {(item.productId.finalPrice * item.quantity).toFixed(2) || '0.00'}</strong>
            </Col>

            <Col xs={12} md={1}>
                <Button variant="danger" className="fs-6 fw-bold mt-2 mt-md-0" title="Remove item"  onClick={() => deleteItem(item.productId._id)}>DELETE</Button>
            </Col>
        </Row>
    );
}
