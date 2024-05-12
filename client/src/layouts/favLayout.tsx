import { useEffect, useState } from "react";
import Layout from "./templates/layout";
import getMovieDetails from "@/apis/movie";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import NoImage from "@/assets/NoImage.png";

export const FavouriteLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<MovieData[]>([]);
  const favourites = sessionStorage.getItem("favourites");
  let favouritesList = [];
  if (favourites !== null) {
    favouritesList = JSON.parse(favourites);
  }

  useEffect(() => {
    const getRecentMovies = async () => {
      setIsLoading(true);
      if (favouritesList) {
        const moviePromises = favouritesList.map((id: string) => getMovieDetails(parseInt(id)));
        const movies = await Promise.all(moviePromises);
        setMovies(movies);
        setIsLoading(false);
      }
    };
    getRecentMovies();
  }, []);
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Layout>
          {movies.length >= 1 ? (
            <div className="p-6">
              <h3 className="text-4xl font-bold">My Favourites</h3>
              <div className="grid grid-cols-6 gap-10 py-10">
                {movies?.map((movie: any) => (
                  <Link href={`/movie/${movie?.id}`}>
                    <div
                      className="flex flex-col max-w-2xl gap-1"
                      key={movie?.id}
                    >
                      <img
                        src={
                          movie?.poster_path
                            ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}`
                            : NoImage.src
                        }
                        className="w-full h-full object-cover"
                        alt=""
                      />
                      <p className="text-lg font-light">{movie?.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            "You have not viewed anything"
          )}
        </Layout>
      )}
    </div>
  );
};
