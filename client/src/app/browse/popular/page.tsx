import { MovieBrowseLayout } from "@/page.components/movies/movieBrowse";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Popular Movies - The Movie Watch List",
  description: "Powered by TMDB API",
};

const AllNewMovies = () => {
  return <MovieBrowseLayout movieKey='popular' />;
};

export default AllNewMovies;