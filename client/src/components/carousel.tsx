import { useEffect, useState } from "react";
import { getNewMovies } from "../lib/getMovies";
import dynamic from "next/dynamic";
import Link from "next/link";
const Carousal = dynamic(
  () => import("3d-react-carousel-ts").then((mod) => mod.Carousel),
  {
    ssr: false, 
  }
);

export const Carousel = () => {
  const [carouselImages, setCarouselImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const popularMovies = await getNewMovies();
      const movies = popularMovies.slice(0, 6).map((movie: Movie) => ({
        id: movie.id,
        path: movie.poster_path,
      }));
      const imagePaths = movies.map((movie: any) => (
          <Link className="contents" href={`/movie/${movie.id}`}>
            <img
              className="carouselImg"
              src={`https://image.tmdb.org/t/p/original/${movie.path}`}
              alt=""
            />
          </Link>
      ));
      setCarouselImages(imagePaths);
    };
    fetchImages();
  }, []);

  return <Carousal slides={carouselImages} />;
};
