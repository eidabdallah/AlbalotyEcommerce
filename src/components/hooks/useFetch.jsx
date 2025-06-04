import axios from 'axios';
import { useEffect, useState } from 'react'

export default function useFetch(url , shouldTrack = false , config = {}) {
    const[data,setData] = useState({});
    const[error,setError] = useState(null);
    const[isLoading,setIsLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const getData = async()=>{
        try{
            const result = await axios.get(url,config);
            setData(result.data);
            setError(null);
            setResponse(result)
        }catch(err){
            setError(err.result?.data.message || err.message);
            console.log(err);
        }finally{
            setIsLoading(false);
        }
    };
    useEffect(()=>{
        getData();
    },shouldTrack ? [url] : []);

  return {data , error , isLoading , response};
}
