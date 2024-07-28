"use client";
import { formatReleaseDate, formatRuntime } from "@/utils/formatDateorTime";
import { Icon } from "@iconify/react/dist/iconify.js";
import { formatToCurrency } from "@/utils/formatAmount";
import { Key } from "react";
import { useState } from "react";
import VideoList from "./VideoList";
import CircularProgress from "./circularProgressBar";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/constants/queries";
import { Loader } from "@/components/common/Loader";
import { useRouter } from "next/navigation";

export const MovieDetails = ({ movieData, handleVideoOpen }: any) => {
  const directors = movieData.misc[0]?.crew.filter(
    (crew: { job: string }) => crew.job === "Director"
  );
  const movieTrailer = movieData.misc[3]?.results[0]?.key
  return (
    <div className="flex max-lg:flex-col max-lg:justify-end h-full lg:items-end p-8 lg:p-20 gap-10">
      <div className="flex gap-8 flex-col lg:w-1/3">
        <h2 className="text-4xl uppercase title-font font-bold">{movieData.title}</h2>
        <div className="font-light">{movieData.overview}</div>
        <span className="flex items-center gap-8">
          <p className="uppercase">Watch Trailer</p>
          <span
            className="p-3 flex items-center justify-center rounded-full border-2 cursor-pointer"
            onClick={() => handleVideoOpen(movieTrailer)}
          >
            <Icon icon="solar:play-bold" />
          </span>
        </span>
      </div>
      <div className="flex lg:grid overflow-auto lg:grid-cols-2 2xl:grid-cols-3 gap-12 lg:w-1/3 ">
        <span className="flex flex-col">
          <p className="text-slate-400 uppercase font-semibold">Genre</p>
          <div className="flex gap-1 lg:flex-wrap">
            {movieData?.genres?.map((genre: { id: Key; name: string }, index: number, array: []) => (
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
          <p className="text-slate-400 uppercase font-semibold">Runtime</p>
          <p>{formatRuntime(movieData.runtime)}</p>
        </span>
        <span className="flex flex-col">
          <p className="text-slate-400 uppercase font-semibold">Country</p>
          <span className="flex gap-1 lg:flex-wrap">
            {movieData.production_countries?.map(
              (country: { id: number; iso_3166_1: string }, index: number, array: []) => (
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
        <span className="flex flex-col max-lg:w-full">
          <p className="text-slate-400 uppercase font-semibold">Release Date</p>
          <p>{formatReleaseDate(movieData.release_date)}</p>
        </span>
        <span className="flex flex-col">
          <p className="text-slate-400 uppercase font-semibold">Director</p>
          <span className="flex gap-1 lg:flex-wrap">
            {directors?.map((crew: { id: Key; name: string }, index: number, array: []) => (
              <span key={crew.id}>
                <p className="text-nowrap">
                  {crew.name}
                  <span>{index !== array.length - 1 && ", "}</span>
                </p>
              </span>
            ))}
          </span>
        </span>
        {movieData.revenue > 0 && <span className="flex flex-col">
          <p className="text-slate-400 uppercase font-semibold">Revenue</p>
          <p>{formatToCurrency(movieData.revenue)}</p>
        </span>}
      </div>
      <MovieBookmark movieData={movieData} handleVideoOpen={handleVideoOpen} />
    </div>
  );
};

const MovieBookmark = ({ movieData, handleVideoOpen }: any) => {
  const router = useRouter()
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
    if (!localUser) {
      router.push("/auth/login");
      return;
    }

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
    <>
    <div className="flex items-center gap-4 lg:hidden">
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
        <div className="bg-primary p-3 rounded-2xl">
          <Icon
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={toggleFavourites}
            color="#FFC0CB"
            className="text-2xl cursor-pointer transition-all delay-75 ease-in-ou"
            icon={icon}
          />
        </div>
      </div>
      <div className="max-lg:hidden flex flex-col items-center absolute right-0 top-40 mr-10 space-y-2 bg-[#171930] p-6 max-w-xs 2xl:max-w-sm z-50">
        <Toaster position="top-right" containerClassName="font-bold" />
        <img
          className="p-6"
          src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
          alt={movieData.data?.title}
        />
        <div className="max-lg:hidden">
          {movieData.vote_average > 0 && (
            <CircularProgress percentage={movieData.vote_average} />
          )}
        </div>
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
          <div className="flex flex-col pt-20 justify-center items-center max-lg:hidden">
            <p className="font-bold text-xl pb-10">Trailers and videos</p>
            <div className="flex flex-col items-center justify-center gap-2">
              <VideoList videos={allVideos} handleVideoOpen={handleVideoOpen} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};