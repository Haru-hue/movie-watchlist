import { getMovies, getTrendingMovies } from "@/apis/movie";
import Spinner from "@/components/Spinner";
import { LayoutView } from "@/components/layouts";
import { useQueries, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const AllMovies = () => {
  const allMovies = useQueries({
    queries: movieCategories.map((key) => {
      return {
        queryKey: ["movies", key],
        queryFn: () => getMovies(key),
      };
    }),
  });

  const trendingMovies = useQuery({
    queryKey: ["movies"],
    queryFn: () => getTrendingMovies(),
  });
  const [numItemsToShow, setNumItemsToShow] = useState(6);

  useEffect(() => {
    const updateNumItemsToShow = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setNumItemsToShow(4);
      } else if (width <= 1366) {
        setNumItemsToShow(5);
      } else {
        setNumItemsToShow(6);
      }
    };
    window.addEventListener("resize", updateNumItemsToShow);
    updateNumItemsToShow();

    return () => window.removeEventListener("resize", updateNumItemsToShow);
  }, []);

  const isLoading = allMovies.every(query => query.isLoading) || trendingMovies.isLoading

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <LayoutView>
          <div className="flex flex-col ml-6 px-6 space-y-10">
            <section>
              <div className="flex justify-between">
                <h4 className="text-slate-300 pb-6 uppercase font-bold text-2xl">
                  Trending Now
                </h4>
                <Link href="/browse/trending">
                  <p className="text-slate-400 text-sm">View All</p>
                </Link>
              </div>
              <div
                className="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
                id="trendingMovies"
              >
                {trendingMovies.data.slice(0, numItemsToShow).map((movie: any) => (
                  <Link
                    className="max-w-fit"
                    key={movie.id}
                    href={`/movie/${movie.id}`}
                  >
                    <img
                      className="rounded-lg w-60 h-80 object-cover"
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <h3 className="font-bold text-base pt-4">{movie.title}</h3>
                  </Link>
                ))}
              </div>
            </section>
            <section>
              <div className="flex justify-between">
                <h4 className="text-slate-300 pb-6 uppercase font-bold text-xl">
                  Popular this season
                </h4>
                <Link href="/browse/popular">
                  <p className="text-slate-400 text-sm">View All</p>
                </Link>
              </div>
              <div
                className="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
                id="newMovies"
              >
                {allMovies[0].data.slice(0, numItemsToShow).map((movie) => (
                  <Link
                    className="max-w-fit"
                    key={movie.id}
                    href={`/movie/${movie.id}`}
                  >
                    <img
                      className="rounded-lg w-60 h-80 object-cover"
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <h3 className="font-bold text-base pt-4">{movie.title}</h3>
                  </Link>
                ))}
              </div>
            </section>
            <section>
              <div className="flex justify-between">
                <h4 className="text-slate-300 pb-6 uppercase font-bold text-2xl">
                  upcoming movies
                </h4>
                <Link href="/browse/new">
                  <p className="text-slate-400 text-sm">View All</p>
                </Link>
              </div>
              <div
                className="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
                id="newMovies"
              >
                {allMovies[1].data.slice(0, numItemsToShow).map((movie) => (
                  <Link
                    className="max-w-fit"
                    key={movie.id}
                    href={`/movie/${movie.id}`}
                  >
                    <img
                      className="rounded-lg w-60 h-80 object-cover"
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <h3 className="font-bold text-base pt-4">{movie.title}</h3>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </LayoutView>
      )}
    </div>
  );
};

// Define your movie categories
const movieCategories = ["popular", "upcoming"];