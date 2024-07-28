import { SearchMovies } from "@/page.components/search/searchMovies";
import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Search - The Movie Watch List",
  description: "Powered by TMDB API",
};

const SearchPage = () => {
  return (
    <Suspense>
      <SearchMovies />
    </Suspense>
  );
};

export default SearchPage;
