import { useParams } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch.jsx';
import Loading from '../../../shared/Loading/Loading.jsx';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import styles from './SubCategoryDetails.module.css'
import Product from '../../Products/Product/Product.jsx';
export default function SubCategoryDetails() {
    const { subCategoryId } = useParams();
    const { data, isLoading, error } = useFetch(`${import.meta.env.VITE_BURL}/subCategories/${subCategoryId}`);
    if(isLoading)
        <Loading />
    return (
        <>  
            {error ? ( <Alert variant="danger" className="text-center fw-bold shadow-sm"> ⚠️ Error: {error} </Alert> ) : data?.subCategory?.name ? (
                <div>
                    <h2 className={styles.categoryHeader}>
                        <span>{data.subCategory.name}</span> Category
                    </h2>
                    <Product apiPath={`products/productsSubCategory/${subCategoryId}`} title={`Products for ${data.subCategory.name}`} />
                </div>) : (
                <Alert variant="warning" className="text-center fw-bold shadow-sm">
                    No Subcategory Data Found.
                </Alert>
            )}
        </>
    )
}
