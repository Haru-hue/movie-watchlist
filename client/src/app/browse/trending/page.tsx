'use client'
import { TrendingMovies } from "@/page.components/movies/trending";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Trending Movies - The Movie Watch List",
  description: "Powered by TMDB API",
};

const AllTrendingMovies = () => {
  return <TrendingMovies/>;
};

export default AllTrendingMovies;