import React from 'react';

function readValue(key, initialValue) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch {
    return initialValue;
  }
}

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = React.useState(() =>
    readValue(key, initialValue),
  );

  const setValue = React.useCallback(
    (value) => {
      try {
        const next =
          typeof value === 'function' ? value(storedValue) : value;
        setStoredValue(next);
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // ignore quota errors in demo mode
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue];
}
