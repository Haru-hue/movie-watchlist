import { useState } from "react";
import VideoList from "./VideoList";
import CircularProgress from "./circularProgressBar";
import { Icon } from "@iconify/react/dist/iconify.js";

export const MovieBookmark = ({ movieData, handleVideoOpen }: any) => {
  const allVideos = movieData.misc[3]?.results;
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const icon = isHovered || isClicked ? "iconoir:star-solid" : "iconoir:star";

  return (
    <div className="flex flex-col items-center space-y-2 absolute right-0 top-40 mr-10 bg-[#171930] p-6 max-w-xs 2xl:max-w-sm z-50">
      <img
        className="p-6"
        src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
        alt={movieData.data?.title}
      />
      {movieData.vote_average > 0 &&  <CircularProgress percentage={movieData.vote_average} />}
      <div className="flex items-center gap-4">
        <button className="uppercase border-2 py-2 px-4 rounded-lg text-nowrap font-bold">
          Add to watchlist
        </button>
        <Icon
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(prev) => setIsClicked(!prev)}
          color="#FFC0CB"
          className="text-4xl cursor-pointer transition-all delay-75 ease-in-out"
          icon={icon}
        />
      </div>
      <div className="flex flex-col pt-20 justify-center items-center">
        <p className="font-bold text-xl pb-10">Trailers and videos</p>
        <div className="flex flex-col items-center justify-center gap-2">
          <VideoList videos={allVideos} handleVideoOpen={handleVideoOpen} />
        </div>
      </div>
    </div>
  );
};