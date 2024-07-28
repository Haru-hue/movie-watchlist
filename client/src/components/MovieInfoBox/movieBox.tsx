import { MovieRecBox, RecBox } from "@/page.components/homePage/movieBox";
import Link from "next/link";

export const MovieBox = ({
  layout,
  movies,
}: {
  layout: string;
  movies: any[] | undefined | Movie[];
}) => {
  return (
    <>
      {layout === "grid" && (
        <div className="responsiveGrid gap-4">
          {movies?.map((movie: Movie) => (
            <Link
              className="max-w-fit"
              key={movie?.id}
              href={`/movie/${movie?.id}`}
            >
              <img
                className="rounded-lg"
                src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                alt={movie?.title}
              />
              <h3 className="font-bold text-base pt-4">{movie?.title}</h3>
            </Link>
          ))}
        </div>
      )}
      {layout === "gridStack" && (
        <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-6">
          {movies?.map((movie: Movie) => (
            <RecBox movieData={movie} />
          ))}
        </div>
      )}
      {layout === "list" && (
        <div className="space-y-4">
          {movies?.map((movie: Movie) => (
            <MovieRecBox movieData={movie} />
          ))}
        </div>
      )}
    </>
  );
};
