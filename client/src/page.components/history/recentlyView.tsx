"use client";
import { getMovieDetails } from "@/apis/movie";
import { Spinner } from "@/components/common/Loader";
import { LayoutView } from "@/components/layouts";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { useQueries } from "@tanstack/react-query";
import Link from "next/link";

export const RecentlyViewed = () => {
  const [listOfMovies = []] = useLocalStorage("navigationHistory") as string[];
  const MOVIE_HISTORY = listOfMovies ?? [];
  const RECENT_MOVIE_IDS = MOVIE_HISTORY?.map((m: string) => m.replace("/movie/", ""));
  const RECENTLY_VIEWED_MOVIES = useQueries({
    queries: (RECENT_MOVIE_IDS as string[])?.map((id: string) => {
      return {
        queryKey: ["movies", id],
        queryFn: () => getMovieDetails(id),
      };
    }),
  });
  const isLoading = RECENTLY_VIEWED_MOVIES.every((query) => query.isLoading);

  if (isLoading && RECENTLY_VIEWED_MOVIES.length > 0) {
    return <Spinner />;
  }

  return (
    <LayoutView>
      <section className="p-10">
        <h4 className="text-slate-300 pb-6 font-bold text-2xl">
          Recently Viewed
        </h4>
        {RECENTLY_VIEWED_MOVIES.length > 0 ? (
          <div
            className="responsiveGrid gap-4"
            id="newMovies"
          >
            {RECENTLY_VIEWED_MOVIES?.map((movie: any) => (
                <Link
                  className="max-w-fit"
                  key={movie?.data?.id}
                  href={`/movie/${movie?.data?.id}`}
                >
                  <img
                    className="rounded-xl"
                    src={`https://image.tmdb.org/t/p/w500${movie?.data?.poster_path}`}
                    alt={movie?.data?.title}
                  />
                </Link>
              ))
            }
          </div>
        ): (
          <h3 className="font-bold text-2xl pt-4">No movies to show</h3>
        )}
      </section>
    </LayoutView>
  );
};
