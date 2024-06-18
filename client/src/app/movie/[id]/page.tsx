"use client";
import { getMovieDetails } from "@/apis/movie";
import Spinner from "@/components/Spinner";
import { LayoutView } from "@/components/layouts";
import { MovieDetails } from "@/page.components/moviePage/details";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import ModalVideo from "react-modal-video";

function MoviePage() {
  const [isOpen, setIsOpen] = useState({
    key: "",
    open: false,
  });
  const params = useParams();
  const movieInfo = useQuery({
    queryKey: ["movies", params.id],
    queryFn: () => getMovieDetails(params.id),
  });
  const movieMisc = useQueries({
    queries: movieDetails.map((query) => {
      return {
        queryKey: [query, params.id],
        queryFn: () => getMovieDetails(params.id, query),
      };
    }),
  });

  const isLoading =
    movieMisc.every((query) => query.isLoading) || movieInfo.isLoading;
  const movieData = {
    ...movieInfo.data,
    misc: movieMisc.map((query) => query.data),
  };
  const handleVideoOpen = (key: string) => {
    setIsOpen((prev) => ({
      ...prev,
      key: key,
      open: true,
    }));
  };

  const handleVideoClose = () => {
    setIsOpen((prev) => ({ ...prev, open: false }));
  };

  return (
    <section>
      {isLoading ? (
        <Spinner />
      ) : (
        <LayoutView>
          <ModalVideo
            isOpen={isOpen.open}
            channel="youtube"
            onClose={handleVideoClose}
            videoId={isOpen.key}
          />
          <div
            className="movieBanner"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
          url('https://image.tmdb.org/t/p/original/${movieInfo.data.poster_path})`,
            }}
          >
            <MovieDetails
              movieData={movieData}
              handleVideoOpen={handleVideoOpen}
            />
          </div>
        </LayoutView>
      )}
    </section>
  );
}

export default MoviePage;

const movieDetails = [
  "credits",
  "images",
  "recommendations",
  "similar",
  "videos",
];