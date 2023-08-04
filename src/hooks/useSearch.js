import {  useState } from "react";
export const useSearch = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  

  return {
    search,
    setSearch,
    error,
    setError
  };
};
