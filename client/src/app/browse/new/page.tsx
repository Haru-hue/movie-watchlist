import { MovieBrowseLayout } from "@/page.components/movies/movieBrowse";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Upcoming Movies - The Movie Watch List",
  description: "Powered by TMDB API",
};

const AllNewMovies = () => {
  return <MovieBrowseLayout movieKey='upcoming' />;
};

export default AllNewMovies;