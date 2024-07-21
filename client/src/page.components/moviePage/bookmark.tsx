"use client";
import { useState } from "react";
import VideoList from "./VideoList";
import CircularProgress from "./circularProgressBar";
import { Icon } from "@iconify/react/dist/iconify.js";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/constants/queries";
import { Loader } from "@/components/common/Loader";

export const MovieBookmark = ({ movieData, handleVideoOpen }: any) => {
  const allVideos = movieData.misc[3]?.results;
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [localUser] = useLocalStorage("localUser") as User[];
  const [userWatchlist, setUserWatchlist] = useState(
    localUser?.watchlist || []
  );
  const [userFavourites] = useLocalStorage("favorites");
  const icon = isHovered || isClicked ? "iconoir:star-solid" : "iconoir:star";
  const isAddedtoWatchlist = userWatchlist?.includes(movieData.id.toString());

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    onCompleted: (res) => {
      toast.success(res.updateUser.message);
      localUser
        ? localStorage.setItem(
            "localUser",
            JSON.stringify({
              ...localUser,
              watchlist: res.updateUser.user.watchlist,
            })
          )
        : null;
    },
    onError: (error) => {
      toast.error(error?.message ?? "An error occured");
    },
  });

  const onProfileChange = (id: string) => {
    updateUser({
      variables: {
        email: localUser?.email,
        watchlist: id,
      },
    });
  };

  const toggleAddToWatchlist = () => {
    const movieId = movieData.id.toString();
    if (isAddedtoWatchlist) {
      setUserWatchlist((prev) => prev.filter((id) => id !== movieId));
    } else {
      setUserWatchlist((prev) => [...prev, movieId]);
    }

    onProfileChange(movieId);
  };

  const toggleFavourites = () => {
    const updatedFavourites = Array(userFavourites);
    const movieId = movieData.id;

    if (!updatedFavourites.includes(movieId)) {
      updatedFavourites.push(movieId);
      setIsClicked(true);
    } else {
      const indexToRemove = updatedFavourites.indexOf(movieId);
      updatedFavourites.splice(indexToRemove, 1);
      setIsClicked(false);
    }

    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  return (
    <div className="flex flex-col max-2xl:hidden items-center space-y-2 absolute right-0 top-40 mr-10 bg-[#171930] p-6 max-w-xs 2xl:max-w-sm z-50">
      <Toaster position="top-right" containerClassName="font-bold" />
      <img
        className="p-6"
        src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
        alt={movieData.data?.title}
      />
      {movieData.vote_average > 0 && (
        <CircularProgress percentage={movieData.vote_average} />
      )}
      <div className="flex items-center gap-4">
        <button
          className="uppercase border-2 py-2 px-4 rounded-lg text-nowrap font-bold"
          onClick={toggleAddToWatchlist}
        >
          {loading ? (
            <Loader />
          ) : isAddedtoWatchlist ? (
            "Remove from watchlist"
          ) : (
            "Add to watchlist"
          )}
        </button>
        <Icon
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={toggleFavourites}
          color="#FFC0CB"
          className="text-4xl cursor-pointer transition-all delay-75 ease-in-out"
          icon={icon}
        />
      </div>
      {allVideos?.length > 0 && (
        <div className="flex flex-col pt-20 justify-center items-center">
          <p className="font-bold text-xl pb-10">Trailers and videos</p>
          <div className="flex flex-col items-center justify-center gap-2">
            <VideoList videos={allVideos} handleVideoOpen={handleVideoOpen} />
          </div>
        </div>
      )}
    </div>
  );
};
