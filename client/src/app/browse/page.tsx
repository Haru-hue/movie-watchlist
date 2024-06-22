import { AllMovies } from "@/page.components/movies/browse";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse - The Movie Watch List",
  description: "Powered by TMDB API",
};


export const BrowseMovies = () => {
  return <AllMovies />;
};

export default BrowseMovies;