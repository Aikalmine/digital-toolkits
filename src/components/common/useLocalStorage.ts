import { useState, useEffect } from "react";

export function getStorageValue(key: string, defaultValue = '') {
  // getting stored value
  if (typeof window !== "undefined") {
    const saved = window.localStorage.getItem(key);
    const initial = saved !== null ? saved : defaultValue;
    return initial;
  }
}

export const useLocalStorage = (key: any, defaultValue: string | undefined) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    let keyValue = value ? value : '';
    window.localStorage.setItem(key,keyValue);
  }, [key, value]);

  return [value, setValue];
};