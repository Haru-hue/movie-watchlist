import getData from "@/utils/getData";

export const getMovies = async (key: string, params?: string) => {
  const queryString = params ?? "";
  try {
    const response = await getData(
      `https://api.themoviedb.org/3/movie/${key}${queryString}`
    );
    return response.results;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMovieDetails = async (id: string, params?: string) => {
  const queryString = params ? `/${params}` : ""
  try {
    const movieDetails = await getData(`https://api.themoviedb.org/3/movie/${parseInt(id)}${queryString}`);
    return movieDetails
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
    return response.results;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const searchMovies = async (params: string, page?: number) => {
  try {
    const response = await getData(
      `https://api.themoviedb.org/3/search/movie?query=${params}&include_adult=false&language=en-US&page=${page ?? 1}`
    );
    return response
  } catch (error) {
    console.error(error);
    return null;
  }
}