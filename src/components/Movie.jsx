/* eslint-disable react/prop-types */
import { CardMovie } from "./CardMovie";
import { NoMovie } from "./NoMovie";

export const Movie = ({movies}) => {
  const hasMovies = movies?.length > 0;
  return <div>{hasMovies ? <CardMovie movies={movies}  /> : <NoMovie />}</div>;
};

