import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function EmptyCartMessage() {
    return (
        <div className="text-center py-5">
            <Alert variant="warning" className="fw-bold shadow-sm mb-4 w-50 m-auto">
                🛒 Your cart is empty. Start adding some items!
            </Alert>
            <Link to="/user" className="btn btn-warning rounded-pill px-4 py-2 fw-bold">
                Start Shopping
            </Link>
        </div>
    );
}
