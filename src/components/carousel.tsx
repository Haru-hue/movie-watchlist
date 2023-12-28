import { useEffect, useState } from "react";
import { getNewMovies } from "../lib/getMovies";
import dynamic from "next/dynamic";
import Slider from "react-slick"
const Carousal = dynamic(() => import('3d-react-carousel-ts').then(mod => mod.Carousel), {
  ssr: false // This will load the component only on client-side
});

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
