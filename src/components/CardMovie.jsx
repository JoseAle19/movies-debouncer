/* eslint-disable react/prop-types */
import "../App.css";
export const CardMovie = ({ movies }) => {
  return (
    <ul className="movies">
      {movies.map((movie) => {
        return (
          <li className="movie" key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} alt="" />
          </li>
        );
      })}
    </ul>
  );
};
