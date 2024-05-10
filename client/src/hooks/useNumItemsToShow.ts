import { useState, useEffect } from 'react';

export function useNumItemsToShow(initialValue: number) {
  const [numItemsToShow, setNumItemsToShow] = useState(6);

  useEffect(() => {
    const updateNumItemsToShow = () => {
      const width = window.innerWidth;

      if (width <= 640) {
        setNumItemsToShow(4);
      } else if (width <= 1366) {
        setNumItemsToShow(5);
      } else {
        setNumItemsToShow(6);
      }
    };

    window.addEventListener("resize", updateNumItemsToShow);
    updateNumItemsToShow();

    return () => window.removeEventListener("resize", updateNumItemsToShow);
  }, []);

  return [numItemsToShow, setNumItemsToShow];
}
