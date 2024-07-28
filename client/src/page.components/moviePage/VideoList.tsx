import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

function VideoList({ videos, handleVideoOpen }: any) {
  const [numVideosToShow, setNumVideosToShow] = useState(5);

  const handleSeeMoreClick = () => {
    if (numVideosToShow >= videos.length) {
      setNumVideosToShow(5);
    } else {
      setNumVideosToShow(numVideosToShow + 5);
    }
  };

  console.log(numVideosToShow, videos.length);
  return (
    <div className="flex flex-col items-center">
      {videos?.slice(0, numVideosToShow).map((video: any) => (
        <div key={video?.id}>
          <div className="flex flex-col items-center justify-center">
            <img
              src={`https://img.youtube.com/vi/${video?.key}/0.jpg`}
              alt={video?.name}
              className="w-96 h-60 object-cover opacity-50"
            />
            <span
              className="absolute p-3 rounded-full border-2 cursor-pointer"
              onClick={() => handleVideoOpen(video?.key)}
            >
              <Icon icon="solar:play-bold" />
            </span>
          </div>
          <h2 className="max-w-72 py-5 font-medium">{video?.name}</h2>
        </div>
      ))}

      {videos?.length > numVideosToShow && (
        <button
          className="uppercase border py-2 px-4 rounded-lg font-bold"
          onClick={handleSeeMoreClick}
        >
          {videos?.length >= numVideosToShow ? "Show less" : "See more videos"}
        </button>
      )}
    </div>
  );
}

export default VideoList;
