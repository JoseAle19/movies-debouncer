
const API_KEY = `16bb0044&s`;
const URL = `https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}`;
export const searchMovies = async ({ search }) => {
  console.log('ser')
  if (search === "") return null;
  try {
    const response = await fetch(URL + `&s=${search}`);
    const json = await response.json();
    const movies = json?.Search;
    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));
  } catch (error) {
    throw new Error('Error feching movies')
  }

};
