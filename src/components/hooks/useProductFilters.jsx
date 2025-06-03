import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function useProductFilters(initialLimit = 20) {
    const [page, setPage] = useState(1);
    const [limit] = useState(initialLimit);
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

    return { page, setPage, limit, sort, setSort, search, register };
}
