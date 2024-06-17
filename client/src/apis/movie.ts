import getData from "@/utils/getData";

export const getMovies = async (key: string, endpoint?: string) => {
  const url = endpoint
    ? `https://api.themoviedb.org/3/movie/${key}/${endpoint}`
    : `https://api.themoviedb.org/3/movie/${key}`;
  try {
    const response = await getData(url);
    const newMovies = await response.results;
    return newMovies;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMovieDetails = async (id: number, endpoint?: string) => {
  const url = endpoint
    ? `https://api.themoviedb.org/3/movie/${id}/${endpoint}`
    : `https://api.themoviedb.org/3/movie/${id}`;
  try {
    const movieDetails = await getData(url);
    const movie = await movieDetails;
    return movie;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTrendingMovies = async (endpoint?: string) => {
  try {
    const response = await getData(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US${endpoint}`
    );
    const movies = await response.results;
    return movies;
  } catch (error) {
    console.error(error);
    return null;
  }
};
