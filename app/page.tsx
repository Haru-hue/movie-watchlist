"use client"
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import { getNewMovies, getRecommendedMovies, getTRatedMovies } from './lib/getMovies'
import { MovieBox, RecBox } from "./components/movieBox";
import Link from "next/link";

type MovieProps = {
  new: Movie[],
  trated: Movie[],
  recommended: Movie[],
}

export default function Home() {
  const [movies, setMovies] = useState<MovieProps>({
    new: [],
    trated: [],
    recommended: [],
  })

  useEffect(() => {
    const fetchNewMovies = async () => {
      const newMovies = await getNewMovies()
      const recMovies = await getRecommendedMovies()
      const tMovies = await getTRatedMovies()
      setMovies((prev) => {
        return {
          ...prev,
          new: newMovies,
          trated: tMovies,
          recommended: recMovies
        }
      })
    }
    fetchNewMovies()
  }, [])
  
  return (
    <main>
      <section className="flex">
        {/* <div className="sidebar">
          <Navbar/>
        </div> */}
        <div className="homeLayout">
          <div className="carousel"></div>
          <div className="flex space-x-10 p-6">
            <section className="list-box w-[70%]">
              <h4 className="text-slate-500">New Movies</h4>
              <div className="grid grid-cols-4 gap-4" id="newMovies">
                {movies.new.slice(0, 4).map((movie) => (
                  <div key={movie.id}>
                    <MovieBox id={movie.id} title={movie.title}
                    rating={movie.vote_average} image={movie.poster_path} overview={movie.overview}/>
                  </div>
                ))}
              </div>
            </section>
            <section className="list-box">
              <h4>Top 5</h4>
              <div id="tRatedMovies">
              <div className="flex flex-col">
                {movies.trated.slice(0, 5).map((movie, index) => (
                  <Link href={``}>
                    <div className='flex justify-between' key={movie.id}>
                      <div className="flex space-x-4">
                        <p className="italic text-2xl">{index}</p>
                        <p className="font-bold">{movie.title}</p>
                      </div>
                      <p>{movie.vote_average.toFixed(1)}</p>
                    </div>
                  </Link>
                ))}
              </div>
              </div>
            </section>
          </div>
          <section id="recMovies">
              <h4>Recommended Movies</h4>
              <div className="list-box grid grid-cols-3">
                {movies.recommended.map((movie) => (
                  <div key={movie.id}>
                    <RecBox id={movie.id} title={movie.title}
                    rating={movie.vote_average} image={movie.poster_path} overview={movie.overview}/>
                  </div>
                ))}
              </div>
            </section>
        </div>
      </section>
    </main>
  );
}
