import { useState, useEffect } from "react";

// Custom hook to listen for changes in localStorage
const useLocalStorage = <T extends any>(key: string | string[]): [T, (k: string, newValue: T) => void] => {
  const isArray = Array.isArray(key);
  const [value, setValue] = useState<T>(() => {
    // Get initial value from localStorage
    if (typeof window !== "undefined") {
      let storedValue: any = isArray ? [] : null;

      if (isArray) {
        (key as string[]).forEach((k) => {
          const item = localStorage.getItem(k);
          if (typeof item === "string") {
            try {
              (storedValue as { [key: string]: any })[k] = JSON.parse(item);
            } catch (error) {
              (storedValue as { [key: string]: any })[k] = item;
            }
          }
        });
      } else {
        const item = localStorage.getItem(key as string);
        if (typeof item === "string") {
          try {
            storedValue = JSON.parse(item);
          } catch (error) {
            storedValue = item;
          }
        }
      }
      return storedValue as T;
    }
    return null as T;
  });

  useEffect(() => {
    // Function to handle changes in localStorage
    const handleChange = () => {
      let storedValue: any = isArray ? [] : null;

      if (isArray) {
        (key as string[]).forEach((k) => {
          const item = localStorage.getItem(k);
          if (typeof item === "string") {
            try {
              (storedValue as { [key: string]: any })[k] = JSON.parse(item);
            } catch (error) {
              (storedValue as { [key: string]: any })[k] = item;
            }
          }
        });
      } else {
        const item = localStorage.getItem(key as string);
        if (typeof item === "string") {
          try {
            storedValue = JSON.parse(item);
          } catch (error) {
            storedValue = item;
          }
        }
      }

      setValue(storedValue as T);
    };

    // Add event listener for storage changes
    window.addEventListener("storage", handleChange);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("storage", handleChange);
    };
  }, [key]);

  // Function to set value to localStorage
  const setLocalStorage = (k: string, newValue: T) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(k, JSON.stringify(newValue));

      if (isArray && typeof newValue === 'object' && newValue !== null) {
        setValue((prevValues) => ({
          ...(prevValues as object),
          [k]: newValue,
        }) as T);
      } else {
        setValue(newValue);
      }
    }
  };

  return [value, setLocalStorage];
};

export default useLocalStorage;