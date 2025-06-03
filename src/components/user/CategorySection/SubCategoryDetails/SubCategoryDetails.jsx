import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch.jsx';
import Loading from '../../../shared/Loading/Loading.jsx';

export default function SubCategoryDetails() {
    const { subCategoryId } = useParams();
    const { data, isLoading, error } = useFetch(`${import.meta.env.VITE_BURL}/subCategories/${subCategoryId}`);
    if (isLoading) return <Loading />;
    console.log(data);
    return (
        <div>SubCategoryDetails</div>
    )
}
