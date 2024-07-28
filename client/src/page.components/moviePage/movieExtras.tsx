import { Spinner } from "@/components/common/Loader";
import { MovieGrid } from "@/components/MovieGrid";
import Link from "next/link";

export const MovieExtras = ({
  isLoading,
  movieBackdrops,
  castList,
  movieRecommendations,
}: {
  isLoading: boolean;
  movieBackdrops: MovieBackrop[];
  castList: Cast[];
  movieRecommendations: Movie[];
}) => {
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="p-4 2xl:p-10 w-full lg:max-w-4xl 2xl:max-w-[75%] space-y-4">
          <MovieGrid
            items={castList}
            renderItem={(crew: Cast) => (
              <div
                className="flex flex-col lg:max-w-fit embla__slide gap-1"
                key={crew?.id}
              >
                <img
                  src={
                    crew?.profile_path
                      ? `https://image.tmdb.org/t/p/original/${crew?.profile_path}`
                      : "/images/noImage.png"
                  }
                  className="w-40 2xl:w-72 object-cover"
                  alt=""
                />
                <p className="text-lg 2xl:text-xl font-semibold pt-4">
                  {crew?.name}
                </p>
                {crew?.character && (
                  <span className="text-slate-400 max-lg:max-w-40">
                    as {crew?.character}
                  </span>
                )}
              </div>
            )}
            columns={5}
            initialItemsToShow={5}
            title="Cast"
            buttonText="See Full cAST"
          />
          <MovieGrid
            items={movieBackdrops}
            renderItem={(image: MovieBackrop) => (
              <div key={image.id} className="embla__slide">
                <img
                  src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                  alt=""
                  className="object-cover size-40 lg:size-full"
                />
              </div>
            )}
            columns={3}
            title="Gallery"
            buttonText="See Gallery"
          />
          <MovieGrid
            items={movieRecommendations}
            renderItem={(movie: Movie) => (
              <Link
                className="embla__slide"
                href={`/movie/${movie?.id}`}
                key={movie?.id}
              >
                <div className="flex flex-col gap-1" key={movie?.id}>
                  <img
                    src={
                      movie?.poster_path
                        ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}`
                        : "/images/noImage.png"
                    }
                    className="w-40 lg:w-full object-cover"
                    alt=""
                  />
                  <p className="font-light max-w-40 lg:max-w-sm">
                    {movie?.title}
                  </p>
                </div>
              </Link>
            )}
            columns={6}
            title="People like this"
            buttonText="See More"
          />
        </section>
      )}
    </div>
  );
};
