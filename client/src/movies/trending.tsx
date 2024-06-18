import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "@/apis/movie";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { LayoutView } from "@/components/layouts";

export const TrendingMovies = () => {
  const movies = useQuery({
    queryKey: ["movies"],
    queryFn: () => getTrendingMovies(),
  });


  return (
    <div>
      {movies.isLoading ? (
        <Spinner />
      ) : (
        <LayoutView>
          <div className="flex flex-col ml-6 px-6 space-y-10">
            <section>
              <div
                className="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
                id="newMovies"
              >
                {movies &&
                  movies?.data.map((movie: Movie) => (
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
                      <h3 className="font-bold text-base pt-4">
                        {movie.title}
                      </h3>
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