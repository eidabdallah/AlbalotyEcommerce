import { Button } from 'react-bootstrap';

export default function Pagination({ page, totalPages, onPrev, onNext }) {
    return (
        <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
            <Button variant="outline-secondary" onClick={onPrev} disabled={page === 1} >← Prev</Button>
            <span className="fw-bold">
                Page {page} of {totalPages}
            </span>
            <Button variant="outline-secondary" onClick={onNext} disabled={page >= totalPages}>Next →</Button>
        </div>
    );
}
