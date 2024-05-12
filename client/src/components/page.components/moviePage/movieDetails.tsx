import { Icon } from "@iconify/react/dist/iconify.js";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import CircularProgress from "./circularProgressBar";
import VideoList from "./VideoList";
import { useAppSelector } from "@/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

dayjs.extend(duration);

interface MovieInformation {
  movieData: MovieData;
  handleVideoOpen: (key: string) => void;
}

function MovieDetails(props: MovieInformation) {
  const router = useRouter();
  const { movieId } = router.query;
  const date = props.movieData.data?.release_date;
  const releaseDate = dayjs(date).format("MMMM D, YYYY");
  const director = props.movieData.credits?.crew.filter(
    (crew) => crew.job === "Director"
  );
  const writers = props.movieData.credits?.crew
    .filter((crew) => crew.known_for_department === "Writing")
    .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);

  const moviePoster = props.movieData.data?.poster_path;
  const favourites = sessionStorage.getItem("favourites");
  let favouritesList = [];
  if (favourites !== null) {
    favouritesList = JSON.parse(favourites);
  }
  const runtime = props.movieData.data?.runtime ?? 0;
  const formattedRuntime = dayjs.duration(runtime, "minutes");
  const movieRuntime = formattedRuntime.format("H[h] mm[mins]");
  const rating = props.movieData.data?.vote_average.toFixed(1);
  const progressRating = Number(rating) * 10;
  const user = useAppSelector((state) => state.users.email);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
    handleAddtoFavourites();
  };

  const icon = isHovered || isClicked ? "iconoir:star-solid" : "iconoir:star";

  const handleAddtoFavourites = () => {
    if (!user) {
      const favourites = sessionStorage.getItem("favourites");
      let favouritesList = [];
      if (favourites !== null) {
        favouritesList = JSON.parse(favourites);
      }
      const index = favouritesList.indexOf(movieId);
      if (index !== -1) {
        favouritesList.splice(index, 1);
      } else {
        favouritesList.push(movieId);
      }
      sessionStorage.setItem("favourites", JSON.stringify(favouritesList));
    }
  };

  useEffect(() => {
    const index = favouritesList.indexOf(movieId);
    if (index !== -1) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  }, [favouritesList]);

  return (
    <div className="flex h-full items-end p-20 gap-10">
      <div className="flex gap-8 flex-col w-1/3">
        <h2 className="text-4xl uppercase font-bold">
          {props.movieData.data?.title}
        </h2>
        <div className="font-light">{props.movieData.data?.overview}</div>
        <span className="flex items-center gap-8">
          <p className="uppercase">Watch Trailer</p>
          <span
            className="p-3 flex items-center justify-center rounded-full border-2 cursor-pointer"
            onClick={() =>
              props.handleVideoOpen(props.movieData.video?.[0]?.key)
            }
          >
            <Icon icon="solar:play-bold" />
          </span>
        </span>
      </div>
      <div className="grid grid-cols-2 2xl:grid-cols-3 gap-12 w-1/3 ">
        <span className="flex flex-col">
          <p className="text-slate-400 uppercase">Genre</p>
          <div className="flex gap-1 flex-wrap">
            {props.movieData.data?.genres.map((genre, index, array) => (
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
          <p>{movieRuntime}</p>
        </span>
        <span className="flex flex-col">
          <p className="text-slate-400 uppercase">Country</p>
          <span className="flex gap-1 flex-wrap">
            {props.movieData.data?.production_countries?.map(
              (country, index, array) => (
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
          <p>{releaseDate}</p>
        </span>
        <span className="flex flex-col">
          <p className="text-slate-400 uppercase">Director</p>
          <span className="flex gap-1 flex-wrap">
            {director?.map((crew, index, array) => (
              <span key={crew.id}>
                <p className="text-nowrap">
                  {crew.name}
                  <span>{index !== array.length - 1 && ", "}</span>
                </p>
              </span>
            ))}
          </span>
        </span>
        {writers && writers.length > 0 && (
          <span className="flex flex-col">
            <p className="text-slate-400 uppercase">Writers</p>
            <span className="flex gap-1 flex-wrap">
              {writers?.map((crew, index, array) => (
                <span key={crew.id}>
                  <p className="text-nowrap">
                    {crew.name}
                    <span>{index !== array.length - 1 && ", "}</span>
                  </p>
                </span>
              ))}
            </span>
          </span>
        )}
      </div>
      <div className="flex flex-col items-center space-y-2 absolute right-0 top-40 mr-10 bg-[#171930] p-6 max-w-xs 2xl:max-w-sm z-50">
        <img
          className="p-10"
          src={`https://image.tmdb.org/t/p/original/${moviePoster}`}
          alt={props.movieData.data?.title}
        />
        <CircularProgress percentage={progressRating} />
        <div className="flex items-center gap-4">
          <button className="uppercase border-2 py-2 px-4 rounded-lg text-nowrap">
            Add to watchlist
          </button>
          <Icon
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            color="#FFC0CB"
            className="text-4xl cursor-pointer transition-all delay-75 ease-in-out"
            icon={icon}
          />
        </div>
        <div className="flex flex-col pt-20 justify-center items-center">
          <p className="font-bold text-xl pb-10">Trailers and videos</p>
          <div className="flex flex-col items-center justify-center gap-2">
            <VideoList
              videos={props.movieData.video}
              handleVideoOpen={props.handleVideoOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
