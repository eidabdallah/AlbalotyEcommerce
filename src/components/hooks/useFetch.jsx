import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function useFetch(url) {
    const[data,setData] = useState({});
    const[error,setError] = useState(null);
    const[isLoading,setIsLoading] = useState(true);
    // const controller = new AbortController();
    const getData = async()=>{
        try{
            const {data} = await axios.get(url/*,{
                signal : controller.signal
            }*/);
            setData(data);
            setError(null);
        }catch(err){
            setError(err.response?.data.message || err.message);
            console.log(err);
        }finally{
            setIsLoading(false);
        }
    };
    useEffect(()=>{
        getData();
        // return () => controller.abort();
    },[])

  return {data , error , isLoading};
}
