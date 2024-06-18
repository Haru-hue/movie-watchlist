import { formatReleaseDate, formatRuntime } from "@/utils/formatDateorTime";
import { MovieBookmark } from "./bookmark";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

export const MovieDetails = ({ movieData, handleVideoOpen }: any) => {
  const [isOpen, setIsOpen] = useState({
    key: "",
    open: false,
  });
  const directors = movieData.misc[0].crew.filter(
    (crew) => crew.job === "Director"
  );

  return (
    <div className="flex h-full items-end p-20 gap-10">
      <div className="flex gap-8 flex-col w-1/3">
        <h2 className="text-4xl uppercase font-bold">{movieData.title}</h2>
        <div className="font-light">{movieData.overview}</div>
        <span className="flex items-center gap-8">
          <p className="uppercase">Watch Trailer</p>
          <span
            className="p-3 flex items-center justify-center rounded-full border-2 cursor-pointer"
            onClick={() => handleVideoOpen(movieData.video?.[0]?.key)}
          >
            <Icon icon="solar:play-bold" />
          </span>
        </span>
      </div>
      <div className="grid grid-cols-2 2xl:grid-cols-3 gap-12 w-1/3 ">
        <span className="flex flex-col">
          <p className="text-slate-400 uppercase">Genre</p>
          <div className="flex gap-1 flex-wrap">
            {movieData.genres.map((genre, index: number, array: []) => (
              <div key={genre.id}>
                <p>
                  {genre.name}
                  <span>{index !== array.length - 1 && ","}</span>
                </p>
              </div>
            ))}
          </div>
        </span>
        <span className="flex flex-col">
          <p className="text-slate-400 uppercase">Runtime</p>
          <p>{formatRuntime(movieData.runtime)}</p>
        </span>
        <span className="flex flex-col">
          <p className="text-slate-400 uppercase">Country</p>
          <span className="flex gap-1 flex-wrap">
            {movieData.production_countries?.map(
              (country, index: number, array: []) => (
                <div key={country.id}>
                  <p>
                    {country.iso_3166_1}
                    <span>{index !== array.length - 1 && ","}</span>
                  </p>
                </div>
              )
            )}
          </span>
        </span>
        <span className="flex flex-col">
          <p className="text-slate-400 uppercase">Release Date</p>
          <p>{formatReleaseDate(movieData.release_date)}</p>
        </span>
        <span className="flex flex-col">
          <p className="text-slate-400 uppercase">Director</p>
          <span className="flex gap-1 flex-wrap">
            {directors?.map((crew, index: number, array: []) => (
              <span key={crew.id}>
                <p className="text-nowrap">
                  {crew.name}
                  <span>{index !== array.length - 1 && ", "}</span>
                </p>
              </span>
            ))}
          </span>
        </span>
        <span className="flex flex-col">
          <p className="text-slate-400 uppercase">Revenue</p>
          <p>{movieData.revenue}</p>
        </span>
      </div>
      <MovieBookmark movieData={movieData} handleVideoOpen={handleVideoOpen} />
    </div>
  );
};
