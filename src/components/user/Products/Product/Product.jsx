import styles from "./Product.module.css";
import Alert from "react-bootstrap/Alert";
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap';
import Loading from '../../../shared/Loading/Loading.jsx';
import useFetch from '../../../hooks/useFetch.jsx';
import ProductCard from '../ProductCard/ProductCard.jsx';
import Pagination from './../Pagination/Pagination.jsx';
import useProductFilters from '../../../hooks/useProductFilters.jsx';

export default function Product({ apiPath, title }) {
    const { page, setPage, limit, sort, setSort, search, register } = useProductFilters();
    const url = `${import.meta.env.VITE_BURL}/${apiPath}?page=${page}&limit=${limit}${sort ? `&sort=${sort}` : ''}${search ? `&search=${search}` : ''}`;
    const { data, isLoading, error } = useFetch(url);
    const totalPages = Math.ceil(data?.count / limit);
    const handleSortChange = (e) => {
        setSort(e.target.value);
        setPage(1);
    };
    if (isLoading) return <Loading />;
    return (
        <div className="py-5">
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className={`fw-bold ${styles.title}`}>{title}</h2>
                    <Form.Select onChange={handleSortChange} value={sort} style={{ width: '200px' }}>
                        <option value="">Sort By</option>
                        <option value="finalPrice">Price Low to High</option>
                        <option value="-finalPrice">Price High to Low</option>
                        <option value="name">Name A-Z</option>
                        <option value="-name">Name Z-A</option>
                    </Form.Select>
                </div>

                <Form className="mb-4">
                    <div className="position-relative" style={{ maxWidth: '400px' }}>
                        <Form.Control type="text" placeholder="🔍 Search for products..." {...register('search')} className="ps-5 rounded-pill shadow-sm border-secondary" />
                        <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
                    </div>
                </Form>


                {error ? (<Alert variant="danger" className="text-center fw-bold shadow-sm">⚠️ Error: {error}    </Alert>)
                    : data?.products?.length === 0 ? (<Alert variant="warning" className="text-center fw-bold shadow-sm"> No products found.</Alert>)
                        : null}
                <Row className="g-4">
                    {data.products.map((product) => (
                        <Col key={product._id} md={3} sm={6}>
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
                {data?.products?.length > 0 && (
                    <Pagination page={page} totalPages={totalPages} onPrev={() => setPage(p => Math.max(p - 1, 1))} onNext={() => setPage(p => Math.min(p + 1, totalPages))} />
                )}
            </Container>
        </div>
    );
}
