import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Spinner } from "../Loader";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "@/apis/movie";
import Image from "next/image";
const Carousal = dynamic(
  () => import("3d-react-carousel-ts").then((mod) => mod.Carousel),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);

export const Carousel = () => {
  const movieImagePaths = useQuery({
    queryKey: ["movies"],
    queryFn: () => getMovies("upcoming"),
  });
  const carouselImages = movieImagePaths?.data?.slice(0, 6).map((movie: Movie) => (
    <Link className="contents" href={`/movie/${movie.id}`}>
      <img
        className="carouselImg"
        alt={movie?.title}
        src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
      />
    </Link>
  ));

  return <Carousal slides={carouselImages} />;
};
