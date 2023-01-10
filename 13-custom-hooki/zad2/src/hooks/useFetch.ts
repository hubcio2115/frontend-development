import { useState, useEffect } from 'react';

export const useFetch = (): {
  data?: any[];
  isLoading: boolean;
  error: Error;
} => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(new Error());

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://dummyjson.com/products');

        if (res.ok) {
          setData(await res.json());
          setLoading(false);
        }
      } catch (e) {
        setError(e as Error);
        setLoading(false);
      }
    })();
  }, []);

  return { data, isLoading, error };
};
