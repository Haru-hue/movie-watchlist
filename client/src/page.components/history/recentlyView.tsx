"use client";
import { getMovieDetails } from "@/apis/movie";
import { Spinner } from "@/components/common/Loader";
import { LayoutView } from "@/components/layouts";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { useQueries } from "@tanstack/react-query";
import Link from "next/link";

export const RecentlyViewed = () => {
  const [listOfMovies] = useLocalStorage("navigationHistory") as string[];
  const RECENT_MOVIE_IDS =
    listOfMovies?.map((m) => Number(m.replace("/movie/", ""))) || [];
  const RECENTLY_VIEWED_MOVIES = useQueries({
    queries: RECENT_MOVIE_IDS.map((id) => {
      return {
        queryKey: ["movies", id],
        queryFn: () => getMovieDetails(id),
      };
    }),
  });

  const isLoading = RECENTLY_VIEWED_MOVIES.every((query) => query.isLoading);
  console.log(RECENTLY_VIEWED_MOVIES, listOfMovies, RECENT_MOVIE_IDS);
  return (
    <LayoutView>
      <section>
        <h4 className="text-slate-300 pb-6 uppercase font-bold text-2xl">
          Trending Now
        </h4>
        {isLoading ? (
          <Spinner />
        ) : (
          <div
            className="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
            id="newMovies"
          >
            {RECENTLY_VIEWED_MOVIES ? (
              RECENTLY_VIEWED_MOVIES?.map((movie) => (
                (movie.data as MovieData[]).map((movieData) => (
                  <Link
                    className="max-w-fit"
                    key={movieData.id}
                    href={`/movie/${movieData.id}`}
                  >
                    <img
                      className="rounded-lg w-60 h-80 object-cover"
                      src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                      alt={movieData.title}
                    />
                  </Link>
                ))
              ))
              
            ) : (
              <h3 className="font-bold text-base pt-4">No movies to show</h3>
            )}
          </div>
        )}
      </section>
    </LayoutView>
  );
};
