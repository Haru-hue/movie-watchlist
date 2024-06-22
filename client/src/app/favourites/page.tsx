import { AllFavourites } from "@/page.components/favourites/listFavourites";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favourites - The Movie Watch List",
  description: "Powered by TMDB API",
};

const Favourites = () => {
  return <AllFavourites />;
};

export default Favourites;
