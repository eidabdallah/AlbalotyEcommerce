import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch.jsx';
import Loading from '../../shared/Loading/Loading.jsx';
import styles from "./Products.module.css";
import Alert from "react-bootstrap/Alert";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import Pagination from './Pagination/Pagination.jsx';
import ProductCard from './ProductCard/ProductCard.jsx';

export default function Products({ id }) {
    const [page, setPage] = useState(1);
    const [limit] = useState(20);
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const { register, watch } = useForm();
    const searchInput = watch("search", "");
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setSearch(searchInput);
            setPage(1);
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [searchInput]);
    const url = `${import.meta.env.VITE_BURL}/products/productsCategory/${id}?page=${page}&limit=${limit}${sort ? `&sort=${sort}` : ''}${search ? `&search=${search}` : ''}`;
    const { data, isLoading, error } = useFetch(url);
    const totalPages = Math.ceil(data?.count / limit);
    const nextPage = () => {
        if (page < totalPages) setPage(prev => prev + 1);
    };
    const prevPage = () => {
        if (page > 1) setPage(prev => prev - 1);
    };
    const handleSortChange = (e) => {
        setSort(e.target.value);
        setPage(1);
    };
    if (isLoading) return <Loading />;
    return (
        <div className="py-5">
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className={`fw-bold ${styles.title}`}>Products</h2>
                    <Form.Select onChange={handleSortChange} value={sort} style={{ width: '200px' }}>
                        <option value="">Sort By</option>
                        <option value="finalPrice">Price Low to High</option>
                        <option value="-finalPrice">Price High to Low</option>
                        <option value="name">Name A-Z</option>
                        <option value="-name">Name Z-A</option>
                    </Form.Select>
                </div>

                <Form className="mb-3 d-flex gap-2">
                    <Form.Control type="text" placeholder="Search..."{...register('search')} />
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
                    <Pagination page={page} totalPages={totalPages} onPrev={prevPage} onNext={nextPage} />
                )}
            </Container>
        </div>
    );
}
