import React from 'react';

const Debounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = React.useState('');

  React.useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timeOut);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default Debounce;
