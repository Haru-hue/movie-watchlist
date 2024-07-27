"use client";
import { getMovieDetails } from "@/apis/movie";
import { Spinner } from "@/components/common/Loader";
import { LayoutView } from "@/components/layouts";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { useQueries } from "@tanstack/react-query";
import Link from "next/link";

export const AllFavourites = () => {
  const [listOfMovies = []] = useLocalStorage("favourites") as string[];
  const favouriteMovies = listOfMovies ?? [];
  const FAVOURITE_MOVIES = useQueries({
    queries: (favouriteMovies as string[])?.map((id: string) => {
      return {
        queryKey: ["movies", id],
        queryFn: () => getMovieDetails(id),
      };
    }),
  });

  const isLoading = FAVOURITE_MOVIES.every((query) => query.isLoading);

  if (isLoading && FAVOURITE_MOVIES.length > 0) {
    return <Spinner />;
  }

  return (
    <LayoutView>
      <section className="flex flex-1 flex-col h-full p-10">
        <h4 className="text-slate-300 pb-6 font-bold text-2xl">Favourites</h4>
        {FAVOURITE_MOVIES.length > 0 ? (
          <div
            className="responsiveGrid gap-4"
            id="newMovies"
          >
            {FAVOURITE_MOVIES?.map((movie: any) => (
              <Link
                className="max-w-fit"
                key={movie.data.id}
                href={`/movie/${movie.data.id}`}
              >
                <img
                  className="rounded-xl"
                  src={`https://image.tmdb.org/t/p/w500${movie.data.poster_path}`}
                  alt={movie.data.title}
                />
              </Link>
            ))}
          </div>
        ) : (
          <h3 className="font-bold text-2xl pt-4 text-center justify-center self-center justify-self-center">
            No movies to show
          </h3>
        )}
      </section>
    </LayoutView>
  );
};
