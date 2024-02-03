import Link from "next/link";
import React, { useState } from "react";

function MovieRecsList({ movieRecs }: any) {
  const [numMovieRecs, setNumMovieRecs] = useState(6);

  const handleSeeMoreClick = () => {
    if (numMovieRecs >= movieRecs.length) {
      setNumMovieRecs(6);
    } else {
      setNumMovieRecs(movieRecs.length);
    }
  };

  return (
    <div>
      <section>
        <h1 className="font-bold text-3xl py-10">People like this</h1>
        <div className="grid grid-cols-6 gap-10 max-w-fit">
          {movieRecs?.slice(0, numMovieRecs).map((movie: any) => (
            <Link href={`/movie/${movie?.id}`} key={movie?.id}>
                <div className="flex flex-col max-w-fit gap-1" key={movie?.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                    className="w-full h-80 object-cover"
                    alt=""
                  />
                  <p className="text-lg font-light">{movie?.title}</p>
                </div>
            </Link>
          ))}
        </div>
      </section>
      <div className="flex items-center pt-10">
        <div className="w-full h-1 bg-gradient-to-r from-[#262f66] to-[#0c1124] rounded-lg shadow-lg flex" />
        <button
          className="uppercase border-2 py-2 px-4 rounded-lg text-nowrap"
          onClick={handleSeeMoreClick}
        >
          {numMovieRecs >= movieRecs?.length ? "Show less" : "See more"}
        </button>
      </div>
    </div>
  );
}

export default MovieRecsList;
