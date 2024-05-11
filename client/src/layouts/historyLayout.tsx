import React, { use, useEffect, useState } from "react";
import Layout from "./templates/layout";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import NoImage from "@/assets/NoImage.png";
import getMovieDetails from "@/apis/movie";

function HistoryLayout({ movies }: { movies: string[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [recentMovies, setRecentMovies] = useState<MovieData[]>([]);
  const RECENT_MOVIE_IDS = movies.map((m) => Number(m.replace("/movie/", "")));

  useEffect(() => {
    const getRecentMovies = async () => {
      setIsLoading(true);
      const moviePromises = RECENT_MOVIE_IDS.map((id) => getMovieDetails(id));
      const movies = await Promise.all(moviePromises);
      setRecentMovies(movies);
      setIsLoading(false);
    };
    getRecentMovies();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Layout>
          {movies.length >= 1 ? (
            <div className="p-6">
              <h3 className="text-4xl font-bold">Recently Viewed</h3>
              <div className="grid grid-cols-6 gap-10 py-10">
                {recentMovies?.map((movie: any) => (
                  <Link href={`/movie/${movie?.id}`}>
                    <div
                      className="flex flex-col max-w-2xl gap-1"
                      key={movie?.id}
                    >
                      <img
                        src={
                          movie?.poster_path
                            ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}`
                            : NoImage.src
                        }
                        className="w-full h-full object-cover"
                        alt=""
                      />
                      <p className="text-lg font-light">{movie?.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            "You have not viewed anything"
          )}
        </Layout>
      )}
    </div>
  );
}

export default HistoryLayout;
