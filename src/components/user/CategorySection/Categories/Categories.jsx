import Alert from "react-bootstrap/Alert";
import SliderGridCategories from "../SliderGridCategories/SliderGridCategories.jsx";
import useFetch from "../../../hooks/useFetch.jsx";
import Loading from "../../../shared/Loading/Loading.jsx";

export default function Categories() {
  const { data, isLoading, error } = useFetch(`${import.meta.env.VITE_BURL}/categories/active`);
  if (isLoading) return <Loading />;

  return (
    <div className="container py-5">
      {error && (
        <Alert variant="danger" className="text-center fw-bold shadow-sm">
          ⚠️ Error: {error}
        </Alert>
      )}
      <SliderGridCategories title="Explore Categories" data={data.categories} linkPath="/category"/>
    </div>
  );
}