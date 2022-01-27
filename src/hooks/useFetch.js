import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [url]);
  return [data, isLoading];
};

export default useFetch;
