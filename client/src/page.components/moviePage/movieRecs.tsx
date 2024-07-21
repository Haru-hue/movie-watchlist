import { useNumItemsToShow } from "@/utils/hooks/useNumItemsToShow";
import Link from "next/link";
import React, { useState } from "react";

function MovieRecsList({ movieRecs }: any) {
  const {numItemsToShow, setNumItemsToShow} = useNumItemsToShow(6);

  const handleSeeMoreClick = () => {
    if (numItemsToShow >= movieRecs.length) {
      setNumItemsToShow(6);
    } else {
      setNumItemsToShow(movieRecs.length);
    }
  };

  return (
    <div>
      <section>
        <h1 className="font-bold text-3xl py-10">People like this</h1>
        <div className="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-10">
          {movieRecs?.slice(0, numItemsToShow).map((movie: any) => (
            <Link href={`/movie/${movie?.id}`} key={movie?.id}>
                <div className="flex flex-col max-w-fit gap-1" key={movie?.id}>
                  <img
                    src={movie?.poster_path ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}` : '/images/noImage.png'}
                    className="w-full object-cover"
                    alt=""
                  />
                  <p className="font-light max-w-sm">{movie?.title}</p>
                </div>
            </Link>
          ))}
        </div>
      </section>
      <div className="flex items-center pt-10">
        <div className="w-full h-1 bg-gradient-to-r from-[#262f66] to-[#0c1124] rounded-lg shadow-lg flex" />
        <button
          className="uppercase border-2 py-2 px-4 rounded-lg text-nowrap font-semibold"
          onClick={handleSeeMoreClick}
        >
          {numItemsToShow >= movieRecs?.length ? "Show less" : "See more"}
        </button>
      </div>
    </div>
  );
}

export default MovieRecsList;
