"use client";
import { getMovies } from "@/apis/movie";
import { LayoutView } from "@/components/layouts";
import { useQueries } from "@tanstack/react-query";
import { MovieBox, RecBox } from "./movieBox";
import Link from "next/link";
import getColor from "@/utils/getColor";
import { Spinner } from "@/components/common/Loader";

export default function HomePage() {
  const allMovies = useQueries({
    queries: movieCategories.map((key) => {
      return {
        queryKey: ["movies", key],
        queryFn: () => getMovies(key),
      };
    }),
  });

  const isLoading = allMovies.every((query) => query.isLoading);

  return (
    <section>
      {isLoading ? (
        <Spinner />
      ) : (
        <LayoutView>
          <div className="homeLayout ml-6">
            {/* <Carousel /> */}
            <div className="flex space-x-6">
              <section className="list-box w-[70%]">
                <h4 className="text-slate-500 pb-6">New Movies</h4>
                <div className="grid grid-cols-4 gap-4" id="newMovies">
                  {allMovies[0]?.data?.slice(0, 4).map((movie: Movie) => (
                    <MovieBox movieData={movie} />
                  ))}
                </div>
              </section>
              <section className="list-box flex-grow">
                <h4 className="text-xl uppercase text-slate-500 pb-4 font-bold">
                  Top 5
                </h4>
                <div id="tRatedMovies">
                  <div className="flex flex-col space-y-11 pt-8">
                    {allMovies[1]?.data?.slice(0, 5)
                      .map((movie: Movie, index: number) => (
                        <Link href={`/movie/${movie.id}`}>
                          <div
                            className="flex items-center justify-between font-bold"
                            key={movie.id}
                          >
                            <div className="flex items-center space-x-4">
                              <p
                                className={`italic text-2xl ${getColor(index)}`}
                              >
                                {index + 1}
                              </p>
                              <p className="">{movie.title}</p>
                            </div>
                            <p>{movie.vote_average.toFixed(1)}</p>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </section>
            </div>
            <section className="list-box" id="recMovies">
              <h4 className="text-slate-400 font-semibold pb-8">
                Recommended Movies
              </h4>
              <div className="grid grid-cols-3 gap-8">
                {allMovies[2]?.data?.slice(0, 6).map((movie: Movie) => (
                  <RecBox movieData={movie} />
                ))}
              </div>
            </section>
          </div>
        </LayoutView>
      )}
    </section>
  );
}

const movieCategories = ["now_playing", "top_rated", "upcoming"];