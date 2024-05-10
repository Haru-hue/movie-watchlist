import Layout from "./templates/layout";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getMovies } from "@/apis/movie";
import Spinner from "@/components/Spinner";

export const BrowseLayout = () => {
  const [movies, setMovies] = useState<MovieProps>({
    new: [],
    recommended: [],
    upcoming: [],
  });
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    const fetchNewMovies = async () => {
      setIsLoading(true);
      const [newMovies, recMovies, upcomingMovies] = await Promise.all(
        (['new', 'popular', 'upcoming'] as MovieKeys[]).map((key) => getMovies(key))
      )
      setMovies((prev) => {
        return {
          ...prev,
          new: newMovies,
          recommended: recMovies,
          upcoming: upcomingMovies,
        };
      });
      setIsLoading(false);
    };
    fetchNewMovies();
  }, []);

  return (
    <div>
      {isLoading ? <Spinner/> : (
        <Layout>
        <div className="flex flex-col ml-6 px-6 space-y-10">
          <section>
            <div className="flex justify-between">
              <h4 className="text-slate-300 pb-6 uppercase font-bold text-2xl">
                Trending Now
              </h4>
              <Link href="/browse/new">
                <p className="text-slate-400 text-sm">View All</p>
              </Link>
            </div>
            <div
              className="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
              id="newMovies"
            >
              {movies.new && movies.new.slice(0, numItemsToShow).map((movie) => (
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
              <Link href="/browse/new">
                <p className="text-slate-400 text-sm">View All</p>
              </Link>
            </div>
            <div
              className="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
              id="newMovies"
            >
              {movies.recommended && movies.recommended.slice(0, numItemsToShow).map((movie) => (
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
              {movies.upcoming && movies.upcoming.slice(0, numItemsToShow).map((movie) => (
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
      </Layout>
      )}
    </div>
  );
};
