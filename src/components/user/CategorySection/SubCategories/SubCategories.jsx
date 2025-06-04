import styles from "./SubCategories.module.css";
import Alert from "react-bootstrap/Alert";
import useFetch from '../../../hooks/useFetch.jsx';
import Loading from '../../../shared/Loading/Loading.jsx';
import SliderGridCategories from '../SliderGridCategories/SliderGridCategories.jsx';
import { useAuth } from "../../../../Context/AuthContext.jsx";

export default function SubCategories({ id }) {
  const { isGuest } = useAuth();
  const { data, isLoading, error } = useFetch(`${import.meta.env.VITE_BURL}/categories/${id}/subCategory/active`);
  if (isLoading) return <Loading />;

  return (
    <>

      <div className="container pb-5">
        {data.subcategories?.length > 0 &&
          <h2 className={styles.categoryHeader}>
            <span>{data.subcategories[0]?.categoryId?.name}</span> Category
          </h2>
        }
        <SliderGridCategories title="Explore Subcategories" data={data.subcategories} linkPath={isGuest ? "/subCategoryProducts" : "/user/subCategoryProducts"} />
        {error ? (<Alert variant="danger" className="text-center fw-bold shadow-sm">⚠️ Error: {error} </Alert>) : null}
      </div>
    </>
  );
}
