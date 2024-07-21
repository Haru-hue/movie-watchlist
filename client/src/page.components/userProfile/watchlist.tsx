import { getMovieDetails } from "@/apis/movie";
import { Spinner } from "@/components/common/Loader";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { useQueries } from "@tanstack/react-query";
import Link from "next/link";

export const UserWatchlist = () => {
  const [localUser] = useLocalStorage("localUser") as User[];
  const listofMovies = localUser?.watchlist ?? [];
  const USER_WATCHLIST = useQueries({
    queries: listofMovies?.map((id: string) => {
      return {
        queryKey: ["movies", id],
        queryFn: () => getMovieDetails(id),
      };
    }),
  });

  const isLoading = USER_WATCHLIST.every((query) => query.isLoading);

  if (isLoading && USER_WATCHLIST.length > 0) {
    return <Spinner />;
  }

  return (
    <section className="px-20">
        <h2 className="text-3xl font-bold pb-4">Your Watchlist</h2>
        <div
          className="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
          id="newMovies"
        >
          {USER_WATCHLIST?.map((movie: any) => (
            <Link
              className="max-w-fit"
              key={movie?.data?.id}
              href={`/movie/${movie?.data?.id}`}
            >
              <img
                className="rounded-lg w-60 h-80 object-cover"
                src={movie?.data?.poster_path ? `https://image.tmdb.org/t/p/w500${movie?.data?.poster_path}` : '/images/NoImage.png'}
                alt={movie?.data?.title}
              />
            </Link>
          ))}
        </div>
    </section>
  );
};
