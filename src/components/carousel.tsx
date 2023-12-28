import { useEffect, useState } from "react";
import { getNewMovies } from "../lib/getMovies";
import { Carousel as Carousal } from "3d-react-carousel-ts";

export const Carousel = () => {
  const [carouselImages, setCarouselImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const popularMovies = await getNewMovies();
      const posterPaths = popularMovies
        .slice(0, 6)
        .map((movie: Movie) => movie.poster_path);
      const imagePaths = posterPaths.map((path: string) => (
        <img
          className="carouselImg"
          src={`https://image.tmdb.org/t/p/original/${path}`}
          alt=""
        />
      ));
      setCarouselImages(imagePaths);
    };
    fetchImages();
  }, []);

  return <Carousal slides={carouselImages} />;
};
