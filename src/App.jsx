import {  useState ,useCallback} from "react";
import "./App.css";
import { Movie } from "./components/Movie";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import debounce from "just-debounce-it";
export const App = () => {
  const {   search, error, setSearch, setError } = useSearch();
  const [sort, setSort] = useState(false);
  const { movies, getMovies } = useMovies({ search, sort });

  


  const debounceGetMovies = useCallback(
    debounce((search) => {
      console.log("wenas");
      getMovies({ search });
    }, 400),
    [getMovies]
  );

  const handleChange = (e) => {
    const newQuery = e.target.value;
    if (newQuery.startsWith(" ")) return;
    setSearch(newQuery);

    if (newQuery === "") {
      setError("No se puede buscar una pelicula vacia");
      return;
    }
    setError(null);
    debounceGetMovies(newQuery);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({ search });
  };

  return (
    <div className="page">
      <header>
        <h1>buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="">
            A - Z
            <input
              onChange={handleSort}
              value={sort}
              type="checkbox"
              disabled={!movies ? true : false}
            />
          </label>
          <input
            onChange={handleChange}
            value={search}
            type="text"
            placeholder="Avenger, Star Wars, Matrix..."
          />
          <button type="submit">Buscar</button>
        </form>
        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}
      </header>
      <main>
        <Movie movies={movies} />
      </main>
    </div>
  );
};
