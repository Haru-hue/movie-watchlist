import { SearchMovies } from "@/page.components/search/searchMovies";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Search - The Movie Watch List",
  description: "Powered by TMDB API",
};

const SearchPage = () => {
  return <SearchMovies />;
};

export default SearchPage;
