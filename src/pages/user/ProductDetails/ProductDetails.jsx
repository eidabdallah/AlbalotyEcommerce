import { useParams } from "react-router-dom";
import useFetch from "../../../components/hooks/useFetch.jsx";
import Loading from "../../../components/shared/Loading/Loading.jsx";
import { useState } from "react";
import styles from "./ProductDetails.module.css";
import { FaTag, FaBox, FaStar } from "react-icons/fa";
import { Alert } from "react-bootstrap";

export default function ProductDetails() {
  const { productId } = useParams();
  const { data, isLoading, error } = useFetch(`${import.meta.env.VITE_BURL}/products/${productId}`);
  const [selectedImage, setSelectedImage] = useState(null);
  if (isLoading) return <Loading />;
  if (error)
    return (<Alert variant="danger" className="text-center fw-bold shadow-sm w-25 m-auto my-3">⚠️ Error: {error} </Alert>);
  if (!data || !data.product)
    return <Alert variant="warning" className="text-center fw-bold shadow-sm"> No products found.</Alert>;
  const product = data.product;
  const mainImage = selectedImage || product.mainImage;

  return (
    <div className="container my-5" style={{ maxWidth: "1100px" }}>
      <div className="row g-4">
        <div className="col-md-5">
          <div className="main-image-container">
            <img src={mainImage} alt={product.name} className="img-fluid rounded shadow mb-3 border border-2" style={{ height: "450px", width: "100%", objectFit: "cover", borderColor: "#000", }} />
          </div>
          <div className="d-flex flex-wrap gap-2">
            {[product.mainImage, ...product.subImages].map((img, index) => (
              <img key={index} src={img} alt={`thumb-${index}`} onClick={() => setSelectedImage(img)} className={`rounded ${styles.thumbnail} ${selectedImage === img ? styles.thumbnailActive : ""}`} />
            ))}
          </div>
        </div>

        <div className="col-md-7">
          <h2 className="fw-bold text-dark mb-3 text-uppercase">{product.name}</h2>
          <div className="d-flex align-items-center gap-3 mb-3">
            <div>
              <span className="fs-2 fw-bold text-warning">${product.finalPrice}</span>
            </div>
            {product.discount > 0 && (
              <div className="d-flex gap-2">
                <span className="fs-4 fw-semibold text-muted text-decoration-line-through"> ${product.price}</span>
                <span className="badge bg-danger mt-1 align-self-start px-2 py-1 rounded-pill" style={{ fontSize: "0.85rem" }}>                  {product.discount}% OFF                </span>
              </div>
            )}
          </div>

          <div className={`mb-3 p-3 rounded ${styles.description}`}>{product.description}</div>

          <div className="availableOption">
            <h4>Available Options</h4>
            <div className="section d-flex justify-content-between">
              {product.colors?.length > 0 && (
                <div className="mb-3">
                  <strong>Colors:</strong>
                  <div className="d-flex gap-2 mt-2">
                    {product.colors.map((color, index) => (
                      <div key={index} style={{ width: "25px", height: "25px", backgroundColor: color, }}></div>
                    ))}
                  </div>
                </div>
              )}

              {product.size?.length > 0 && (
                <div className="mb-3">
                  <strong>Sizes:</strong>
                  <div className="d-flex gap-2 mt-2">
                    {product.size.map((size, index) => (
                      <span key={index} className="px-3 py-1 rounded text-uppercase bg-light fw-semibold">{size}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button className="btn fw-bold px-4 py-2 rounded-pill shadow-sm mb-4" style={{ backgroundColor: "#ffc107", color: "#000", fontSize: "1.1rem", border: "none", }}            >              🛒 Add to Cart            </button>
          </div>

          <div className={`mb-4 p-3 rounded ${styles.infoCard}`}>
            <p className="mb-2 d-flex align-items-center">
              <FaTag className="me-2 text-warning" />
              <strong>Category:</strong>
              <span className="ms-2 fw-semibold text-dark">{product.categoryId.name}</span>
            </p>
            <p className="mb-2 d-flex align-items-center">
              <FaTag className="me-2 text-warning" />
              <strong>Subcategory:</strong>
              <span className="ms-2 fw-semibold text-dark">{product.subcategoryId.name}</span>
            </p>
            <p className="mb-0 d-flex align-items-center">
              <FaBox className="me-2 text-warning" />
              <strong>Stock:</strong>
              <span className={`ms-2 fw-semibold ${product.stock > 0 ? styles.inStock : styles.outOfStock}`}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </p>
          </div>

          <div className={`rounded shadow-sm ${styles.reviewsContainer}`}>
            <h4 className="fw-bold text-dark mb-3 border-bottom pb-2">Customer Reviews</h4>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index} className={`${styles.reviewCard} mb-3 p-3 rounded`}>
                  <div className="d-flex align-items-center mb-2">
                    <div className={`${styles.avatar} me-2`}></div>
                    <div>
                      <h5 className="mb-0 fw-semibold text-dark">
                        {review.userId?.userName || "Anonymous"}
                      </h5>
                      <div className="d-flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < review.rating ? styles.starActive : styles.starInactive} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mb-0 fw-bold fs-5">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="fst-italic text-muted">No reviews for this product yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}