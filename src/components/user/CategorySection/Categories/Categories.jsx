import Alert from "react-bootstrap/Alert";
import SliderGridCategories from "../SliderGridCategories/SliderGridCategories.jsx";
import useFetch from "../../../hooks/useFetch.jsx";
import Loading from "../../../shared/Loading/Loading.jsx";
import { useAuth } from './../../../../Context/AuthContext';

export default function Categories() {
  const { isGuest } = useAuth();
  const { data, isLoading, error } = useFetch(`${import.meta.env.VITE_BURL}/categories/active`);

  if (isLoading) return <Loading />;

  const categories = Array.isArray(data?.categories) ? data.categories : [];

  return (
    <div className="container py-5">
      {error ? (
        <Alert variant="danger" className="text-center fw-bold shadow-sm">
          ⚠️ Error: {error}
        </Alert>
      ) : (
        <SliderGridCategories
          title="Explore Categories"
          data={categories}
          linkPath={isGuest ? "/category" : "/user/category"}
        />
      )}
    </div>
  );
}
