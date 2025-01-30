import { useEffect, useState } from "react";

const useFetch = (url) => {

    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result.data); 
                setTotalPages(result.total_pages); 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [url])

    return {data, totalPages}
}

export default useFetch