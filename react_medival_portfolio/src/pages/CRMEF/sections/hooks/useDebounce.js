import { useEffect, useState } from 'react';

const useDebounce = (value, delay = 300) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const [isDebouncing, setIsDebouncing] = useState(false);

    useEffect(() => {
        setIsDebouncing(true);
        const timeoutId = window.setTimeout(() => {
            setDebouncedValue(value);
            setIsDebouncing(false);
        }, delay);

        return () => window.clearTimeout(timeoutId);
    }, [value, delay]);

    return { debouncedValue, isDebouncing };
};

export default useDebounce;
