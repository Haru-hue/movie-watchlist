"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { Carousel } from "../components/carousel";
import { MovieBox, RecBox } from "../components/movieBox";
import getColor from "../lib/getColor";
import {
  getNewMovies,
  getRecommendedMovies,
  getTRatedMovies,
} from "../lib/getMovies";
import Header from "../components/header";

type MovieProps = {
  new: Movie[];
  trated: Movie[];
  recommended: Movie[];
};

export default function HomeLayout() {
  const [movies, setMovies] = useState<MovieProps>({
    new: [],
    trated: [],
    recommended: [],
  });

  useEffect(() => {
    const fetchNewMovies = async () => {
      const newMovies = await getNewMovies();
      const recMovies = await getRecommendedMovies();
      const tMovies = await getTRatedMovies();
      setMovies((prev) => {
        return {
          ...prev,
          new: newMovies,
          trated: tMovies,
          recommended: recMovies,
        };
      });
    };
    fetchNewMovies();
  }, []);

  return (
    <div className="homeLayout">
      <Header/>
      <Carousel />
      <div className="flex space-x-6">
        <section className="list-box w-[70%]">
          <h4 className="text-slate-500 pb-6">New Movies</h4>
          <div className="grid grid-cols-4 gap-4" id="newMovies">
            {movies.new.slice(0, 4).map((movie) => (
              <div key={movie.id}>
                <MovieBox
                  id={movie.id}
                  title={movie.title}
                  rating={movie.vote_average}
                  image={movie.poster_path}
                  overview={movie.overview}
                />
              </div>
            ))}
          </div>
        </section>
        <section className="list-box flex-grow">
          <h4 className="text-xl uppercase text-slate-500 pb-4 font-bold">
            Top 5
          </h4>
          <div id="tRatedMovies">
            <div className="flex flex-col space-y-11 pt-8">
              {movies.trated.slice(0, 5).map((movie, index: number) => (
                <Link href={`/movie/${movie.id}`}>
                  <div
                    className="flex items-center justify-between font-bold"
                    key={movie.id}
                  >
                    <div className="flex items-center space-x-4">
                      <p className={`italic text-2xl ${getColor(index)}`}>
                        {index + 1}
                      </p>
                      <p className="">{movie.title}</p>
                    </div>
                    <p>{movie.vote_average.toFixed(1)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
      <section className="list-box" id="recMovies">
        <h4 className="text-slate-400 font-semibold pb-8">
          Recommended Movies
        </h4>
        <div className="grid grid-cols-3 gap-8">
          {movies.recommended
            .slice(2)
            .slice(0, 6)
            .map((movie) => (
              <div key={movie.id}>
                <RecBox
                  id={movie.id}
                  title={movie.title}
                  rating={movie.vote_average}
                  image={movie.poster_path}
                  overview={movie.overview}
                />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
