import { useEffect, useState } from 'react';
import { type FormErrors } from '../types/loginForm';

const useDebounce = (value: FormErrors, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [value]);

  return debounceValue;
};

export default useDebounce;
