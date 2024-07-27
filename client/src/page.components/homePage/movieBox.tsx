import useMediaQuery from "@/utils/hooks/useMediaQuery";
import { truncateString } from "@/utils/truncateString";
import Link from "next/link";

export const MovieBox = ({movieData}: {movieData: Movie}) => {
  return (
    <div className="flex flex-col space-y-8 embla__slide" key={movieData.id}>
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

export const RecBox = ({movieData}: {movieData: Movie}) => {
  const rating = movieData.vote_average.toFixed(1)
  const progressRating = Number(rating) * 10
  const isMobile = useMediaQuery('(max-width: 767px)')
  return (
    <div className="flex max-sm:flex-col space-x-4" key={movieData.id}>
      <Link className="contents" href={`/movie/${movieData.id}`}>
        <img
          className="rounded-xl w-full sm:w-[45%]"
          src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
          alt={movieData.title}
        />
      </Link>
      <div className="flex flex-col space-y-4 pt-4">
        <span className="flex max-md:justify-between md:flex-col md:space-y-4">
          <a href={`/movie/${movieData.id}`}>
            <h3 className="font-bold text-xl">{movieData.title}</h3>
          </a>
          <div className="flex items-center space-x-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="progressBar" style={{ width: `${progressRating}%` }}></div>
            </div>
            <p className="text-2xl text-[#DC606B]">{rating}<span className="text-slate-400 text-sm md:hidden">/10</span></p>
          </div>
        </span>
        <p className="text-slate-500 font-normal">{truncateString(movieData.overview, isMobile ? 250 : 150)}</p>
      </div>
    </div>
  );
};

export const MovieRecBox = ({movieData}: {movieData: Movie}) => {
  console.log(movieData)
  return (
    <div className="flex gap-4 bg-secondary p-6 rounded-2xl max-h-60" key={movieData.id}>
      <div className="relative w-full max-w-32">
        <img
          className="rounded-xl"
          src={`https://image.tmdb.org/t/p/original/${movieData?.poster_path}`}
          alt={movieData.title}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <h3 className="font-bold text-lg">{movieData.title}</h3>
        <p>{movieData.vote_average.toFixed(1)} ({movieData?.vote_count})</p>
        <p className="text-slate-500">
          {movieData.overview}
        </p>
      </div>
    </div>
  );
};
