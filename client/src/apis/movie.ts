import getData from "@/lib/getData";

export async function getMovies(key: MovieKeys) {
  const urlPath = keys[key];
  if (!urlPath) {
    console.error(`Invalid key: ${key}`);
    return null;
  }
  try {
    const response = await getData(
      `https://api.themoviedb.org/3/movie/${urlPath}`
    );
    const newMovies = await response.results;
    return newMovies;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function getMovieDetails(id: number, endpoint?: string) {
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
}

const keys = {
  new: `now_playing`,
  top_rated: `top_rated`,
  upcoming: `upcoming`,
  popular: `popular`,
};
