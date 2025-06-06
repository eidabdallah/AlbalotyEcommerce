// import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
// import Loading from '../../shared/Loading/Loading.jsx';
// import useFetch from '../../hooks/useFetch.jsx';
// import styles from './FeaturedProducts.module.css';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../../Context/AuthContext.jsx';

// export default function FeaturedProducts() {
//     const { data, isLoading, error } = useFetch(`${import.meta.env.VITE_BURL}/products?limit=4`);
//     const { isGuest } = useAuth();
//     if (isLoading) return <Loading />;

//     return (
//         <div className="py-5">
//             <Container>
//                 <h2 className={`text-center fw-bold ${styles.title}`}>
//                     Featured Products
//                 </h2>

//                 {error && (
//                     <Alert variant="danger" className="text-center fw-bold shadow-sm">
//                         ⚠️ Error: {error}
//                     </Alert>
//                 )}

//                 <Row className="g-4">
//                     {data.products.map((product) => (
//                         <Col key={product._id} md={3} sm={6}>
//                             <Card className={`h-100 shadow-sm ${styles.cardHover}`}>
//                                 <Link to={isGuest ? `/productDetails/${product._id}` : `/user/productDetails/${product._id}`} className="text-decoration-none text-dark">
//                                     <div className={styles.imageWrapper}>
//                                         <Card.Img
//                                             variant="top"
//                                             src={product.mainImage}
//                                             className={styles.cardImage}
//                                         />
//                                     </div>
//                                     <Card.Body>
//                                         <Card.Title className={styles.productTitle} title={product.name}>
//                                             {product.name.length > 25 ? product.name.slice(0, 22) + "..." : product.name}
//                                         </Card.Title>

//                                         <div className={`${styles.priceWrapper} mb-3`}>
//                                             {product.price === product.finalPrice ? (
//                                                 <span className={styles.finalPrice}>${product.finalPrice.toFixed(2)}</span>
//                                             ) : (
//                                                 <>
//                                                     <span className={styles.originalPrice}>${product.price.toFixed(2)}</span>
//                                                     <span className={styles.finalPrice}>${product.finalPrice.toFixed(2)}</span>
//                                                     <span className={`badge bg-danger ${styles.offerBadge}`}>
//                                                         -{product.discount}%
//                                                     </span>
//                                                 </>
//                                             )}
//                                         </div>

//                                     </Card.Body>
//                                 </Link>
//                             </Card>

//                         </Col>
//                     ))}
//                 </Row>
//             </Container>
//         </div>
//     );
// }
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import Loading from '../../shared/Loading/Loading.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import styles from './FeaturedProducts.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext.jsx';

export default function FeaturedProducts() {
    const { data, isLoading, error } = useFetch(`${import.meta.env.VITE_BURL}/products?limit=4`);
    const { isGuest } = useAuth();

    if (isLoading) return <Loading />;

    if (error) {
        return (
            <Container className="py-5">
                <h2 className={`text-center fw-bold ${styles.title}`}>
                    Featured Products
                </h2>
              <Alert variant="danger" className="text-center fw-bold shadow-sm">
                         ⚠️ Error: {error}
                  </Alert>
            </Container>
        );
    }
    const products = Array.isArray(data?.products) ? data.products : [];
    return (
        <div className="py-5">
            <Container>
                <h2 className={`text-center fw-bold ${styles.title}`}>
                    Featured Products
                </h2>

                {products.length === 0 ? (
                    <p className="text-center text-muted">لا توجد منتجات حالياً.</p>
                ) : (
                    <Row className="g-4">
                        {products.map((product) => (
                            <Col key={product._id} md={3} sm={6}>
                                <Card className={`h-100 shadow-sm ${styles.cardHover}`}>
                                    <Link
                                        to={isGuest ? `/productDetails/${product._id}` : `/user/productDetails/${product._id}`}
                                        className="text-decoration-none text-dark"
                                    >
                                        <div className={styles.imageWrapper}>
                                            <Card.Img
                                                variant="top"
                                                src={product.mainImage}
                                                className={styles.cardImage}
                                            />
                                        </div>
                                        <Card.Body>
                                            <Card.Title
                                                className={styles.productTitle}
                                                title={product.name}
                                            >
                                                {product.name.length > 25
                                                    ? product.name.slice(0, 22) + "..."
                                                    : product.name}
                                            </Card.Title>

                                            <div className={`${styles.priceWrapper} mb-3`}>
                                                {product.price === product.finalPrice ? (
                                                    <span className={styles.finalPrice}>
                                                        ${product.finalPrice.toFixed(2)}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <span className={styles.originalPrice}>
                                                            ${product.price.toFixed(2)}
                                                        </span>
                                                        <span className={styles.finalPrice}>
                                                            ${product.finalPrice.toFixed(2)}
                                                        </span>
                                                        <span className={`badge bg-danger ${styles.offerBadge}`}>
                                                            -{product.discount}%
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
}
