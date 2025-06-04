import useFetch from './../../../components/hooks/useFetch.jsx';
import Loading from './../../../components/shared/Loading/Loading.jsx';
export default function Cart() {
    const { data, isLoading, error } = useFetch(`${import.meta.env.VITE_BURL}/cart`);
    console.log(data);
    if (isLoading) return <Loading />;
    return (
        <div>Cart Page</div>
    )
}
