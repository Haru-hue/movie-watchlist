"use client";
import { getMovieDetails } from "@/apis/movie";
import { Spinner } from "@/components/common/Loader";
import { LayoutView } from "@/components/layouts";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { useQueries } from "@tanstack/react-query";
import Link from "next/link";

export const AllFavourites = () => {
  const [listOfMovies] = useLocalStorage("favourites") as string[];
  const FAVOURITE_IDS =
    listOfMovies?.map((m: string) => Number(m.replace("/movie/", ""))) || [];
  const FAVOURITE_MOVIES = useQueries({
    queries: FAVOURITE_IDS.map((id: number) => {
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
      <section className="flex flex-1 flex-col h-full">
        <h4 className="text-slate-300 pb-6 font-bold text-2xl">Favourites</h4>
        {FAVOURITE_MOVIES.length > 0 ? (
          <div
            className="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
            id="newMovies"
          >
            {FAVOURITE_MOVIES?.map((movie: any) => (
              <Link
                className="max-w-fit"
                key={movie.data.id}
                href={`/movie/${movie.data.id}`}
              >
                <img
                  className="rounded-lg w-60 h-80 object-cover"
                  src={`https://image.tmdb.org/t/p/w500${movie.data.poster_path}`}
                  alt={movie.data.title}
                />
              </Link>
            ))}
          </div>
        ) : (
          <h3 className="font-bold text-4xl pt-4 text-center justify-center self-center justify-self-center">
            No movies to show
          </h3>
        )}
      </section>
    </LayoutView>
  );
};
