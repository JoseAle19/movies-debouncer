import { useCallback, useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/movies";
export const useMovies = ({ search, sort }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previusSearch = useRef(search);

  // Em esta funcion si la prop que se le pasa que es search entonces esta funcion se crea y destruye
  // por cada que entra al cuerpo del useMovie
  // Para resolver esto se usara el hook useMemo(),
  // --------------------------------------------------
  // como el useMemo solo se usa para variables, para funciones temos el useCallback que hace lo mismo que el  useMemo pero
  // solo para funciones
  const getMovies = useCallback(async ({ search }) => {
    if (search === previusSearch.current) return;
    try {
      setLoading(true);
      setError(null);
      previusSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Este customHook se genera cada ves que se escribe el nombre de la pelicula, asi que para resolver eso, se utlizara el hook usem memo
  // el cual nos permitira que solo se genere cada que cambie el sort
  // lo que basicamente hace este hook es evita que se vuelva  a renderizae la constante, pero siempre si pasa por aca

  // Codigo anterior
  // const sortMovies = sort ? [...movies].sort((a,b) => a.title.localeCompare(b.title)) : movies;

  const sortMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return {
    movies: sortMovies,
    getMovies,
    loading,
    error,
  };
};
