import { Card } from 'react-bootstrap';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
    return (
        <Card className={`h-100 shadow-sm ${styles.cardHover}`}>
            <div className={styles.imageWrapper}>
                <Card.Img variant="top" src={product.mainImage.secure_url || product.mainImage} className={styles.cardImage} />
            </div>
            <Card.Body>
                <Card.Title className={styles.productTitle} title={product.name}>
                    {product.name.length > 25 ? product.name.slice(0, 22) + "..." : product.name}
                </Card.Title>

                <div className={styles.priceWrapper}>
                    {product.price === product.finalPrice ? (
                        <span className={styles.finalPrice}>${product.finalPrice.toFixed(2)}</span>
                    ) : (
                        <>
                            <span className={styles.originalPrice}>${product.price.toFixed(2)}</span>
                            <span className={styles.finalPrice}>${product.finalPrice.toFixed(2)}</span>
                            <span className={`badge bg-danger ${styles.offerBadge}`}>
                                -{product.discount}%
                            </span>
                        </>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}
