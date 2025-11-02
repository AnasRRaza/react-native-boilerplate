import { useCallback, useEffect, useState } from 'react';

export const useCounter = (initialMinutes: number = 1) => {
  const initialSeconds = initialMinutes * 60;
  const [counter, setCounter] = useState(initialSeconds);

  useEffect(() => {
    if (counter === 0) return;

    const interval = setInterval(() => {
      setCounter(prevCounter => {
        if (prevCounter <= 1) {
          clearInterval(interval);

          return 0;
        }

        return prevCounter - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);

  /**
   * Resets the counter back to the initial value.
   */
  const resetCounter = useCallback(() => {
    setCounter(initialSeconds);
  }, [initialSeconds]);

  return { counter, resetCounter };
};
