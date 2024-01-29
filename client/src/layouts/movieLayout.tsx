"use client";
import React, { useEffect, useState } from "react";
import getMovieDetails from "@/lib/getMovieDetails";
import ModalVideo from "react-modal-video";
import CastList from "@/components/moviePage/castList";
import ImageGrid from "@/components/moviePage/imageGrid";
import MovieRecsList from "@/components/moviePage/movieRecs";
import Spinner from "@/components/Spinner";
import MovieDetails from "@/components/moviePage/movieDetails";
import Layout from "./templates/layout";

export default function PageLayout({ movieId }: { movieId: number }) {
  const [isOpen, setIsOpen] = useState({
    key: "",
    open: false,
  });
  const [movieData, setMovieData] = useState<MovieData>({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewMovies = async () => {
      setIsLoading(true);
      const [data, credits, gallery, recommendations, videos, similar] =
        await Promise.all([
          getMovieDetails(movieId),
          getMovieDetails(movieId, "credits"),
          getMovieDetails(movieId, "images"),
          getMovieDetails(movieId, "recommendations"),
          getMovieDetails(movieId, "videos"),
          getMovieDetails(movieId, "similar"),
        ]);

      setMovieData((prev) => ({
        ...prev,
        data: data,
        credits: credits,
        gallery: gallery,
        recommendations:
          recommendations?.results > 0
            ? recommendations?.results
            : similar?.results,
        video: videos?.results,
      }));
      setIsLoading(false); // Set loading to false when data fetch is complete
    };
    fetchNewMovies();
  }, [movieId]);

  const handleVideoOpen = (key: string) => {
    setIsOpen((prev) => ({
      ...prev,
      key: key,
      open: true,
    }));
  };

  return (
    <section>
      {isLoading ? (
        <Spinner />
      ) : (
        <Layout>
          <ModalVideo
            isOpen={isOpen.open}
            channel="youtube"
            onClose={() => setIsOpen((prev) => ({ ...prev, open: false }))}
            videoId={isOpen.key}
          />
          <div
            className="movieBanner"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
          url('https://image.tmdb.org/t/p/original/${movieData?.data?.poster_path})`,
            }}
          >
            <MovieDetails
              movieData={movieData}
              handleVideoOpen={handleVideoOpen}
            />
          </div>
          <section className="p-10 max-w-[75%]">
            <CastList cast={movieData?.credits?.cast} />
            <ImageGrid images={movieData?.gallery?.backdrops} />
            <MovieRecsList movieRecs={movieData?.recommendations} />
          </section>
        </Layout>
      )}
    </section>
  );
}
