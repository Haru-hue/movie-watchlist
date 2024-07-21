import { truncateString } from "@/utils/truncateString";
import Link from "next/link";

export const MovieBox = ({movieData}: any) => {
  return (
    <div className="flex flex-col space-y-8" key={movieData.id}>
      <div className="relative max-w-fit">
        <Link href={`/movie/${movieData.id}`}>
          <img
            className="rounded-xl w-72 h-96 object-cover"
            src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
            alt={movieData.title}
          />
        </Link>
        <p className="rating">{movieData.vote_average.toFixed(1)}</p>
      </div>
      <div className="flex flex-col space-y-2">
        <a href={`/movie/${movieData.id}`}>
          <h3 className="font-bold text-lg">{movieData.title}</h3>
        </a>
        <p className="text-slate-500 text-sm">
          {truncateString(movieData.overview, 35)}
        </p>
      </div>
    </div>
  );
};

export const RecBox = ({movieData}: any) => {
  const rating = movieData.vote_average.toFixed(1)
  const progressRating = Number(rating) * 10

  return (
    <div className="flex space-x-4" key={movieData.id}>
      <Link className="contents" href={`/movie/${movieData.id}`}>
        <img
          className="rounded-xl w-[45%]"
          src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
          alt={movieData.title}
        />
      </Link>
      <div className="flex flex-col space-y-4 pt-4">
        <a href={`/movie/${movieData.id}`}>
          <h3 className="font-bold text-xl">{movieData.title}</h3>
        </a>
        <div className="flex items-center space-x-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="progressBar" style={{ width: `${progressRating}%` }}></div>
          </div>
          <p className="text-2xl text-[#DC606B]">{rating}</p>
        </div>
        <p className="text-slate-500 font-normal">{truncateString(movieData.overview, 150)}</p>
      </div>
    </div>
  );
};

export const MovieRecBox = ({movieData}: any) => {
  return (
    <div className="flex flex-col space-y-4" key={movieData.id}>
      <div className="relative">
        <img
          className="rounded-xl w-64 h-80 object-cover"
          src={`https://image.tmdb.org/t/p/original/${movieData.image}`}
          alt={movieData.title}
        />
        <p className="rating">{movieData.rating.toFixed(1)}</p>
      </div>
      <div className="flex flex-col space-y-2">
        <h3 className="font-bold text-lg">{movieData.title}</h3>
        <p className="text-slate-500 text-sm">
          {truncateString(movieData.overview, 35)}
        </p>
      </div>
    </div>
  );
};
