import { useState } from "react";

function useLocalStorage() {
  const get = (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const set = (key: string, value: any) => {
    try {
      const valueToStore = JSON.stringify(value);
      localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error(error);
    }
  };

  return { get, set };
}

export default useLocalStorage;
