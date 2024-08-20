import { useEffect, useState } from 'react';

export const useDebouncedValue = <T = unknown>(value: T, delay: number): T => {
  const [storedValue, setStoredValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStoredValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return storedValue;
};
