import Link from "next/link";

const truncateString = (str: string, num: number): string => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

export const MovieBox = (props: MovieBox) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="relative">
        <Link href={`/movie/${props.id}`}>
          <img
            className="rounded-xl w-64 h-80 object-cover"
            src={`https://image.tmdb.org/t/p/original/${props.image}`}
            alt={props.title}
          />
        </Link>
        <p className="rating">{props.rating.toFixed(1)}</p>
      </div>
      <div className="flex flex-col space-y-2">
        <a href={`/movie/${props.id}`}>
          <h3 className="font-bold text-lg">{props.title}</h3>
        </a>
        <p className="text-slate-500 text-sm">
          {truncateString(props.overview, 35)}
        </p>
      </div>
    </div>
  );
};

export const RecBox = (props: MovieBox) => {
  const rating = props.rating.toFixed(1)
  const progressRating = Number(rating) * 10

  return (
    <div className="flex space-x-4">
      <Link className="contents" href={`/movie/${props.id}`}>
        <img
          className="rounded-xl w-[45%]"
          src={`https://image.tmdb.org/t/p/original/${props.image}`}
          alt={props.title}
        />
      </Link>
      <div className="flex flex-col space-y-4 pt-4">
        <a href={`/movie/${props.id}`}>
          <h3 className="font-bold text-xl">{props.title}</h3>
        </a>
        <div className="flex items-center space-x-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="progressBar" style={{ width: `${progressRating}%` }}></div>
          </div>
          <p className="text-2xl text-[#DC606B]">{rating}</p>
        </div>
        <p className="text-slate-500">{truncateString(props.overview, 150)}</p>
      </div>
    </div>
  );
};

export const MovieRecBox = (props: MovieBox) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="relative">
        <img
          className="rounded-xl w-64 h-80 object-cover"
          src={`https://image.tmdb.org/t/p/original/${props.image}`}
          alt={props.title}
        />
        <p className="rating">{props.rating.toFixed(1)}</p>
      </div>
      <div className="flex flex-col space-y-2">
        <h3 className="font-bold text-lg">{props.title}</h3>
        <p className="text-slate-500 text-sm">
          {truncateString(props.overview, 35)}
        </p>
      </div>
    </div>
  );
};
