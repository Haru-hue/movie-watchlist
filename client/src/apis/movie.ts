import getData from "@/utils/getData";

export async function getMovies(key: string) {
  try {
    const response = await getData(
      `https://api.themoviedb.org/3/movie/${key}`
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