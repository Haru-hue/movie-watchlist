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
        <img
          className="rounded-xl"
          src={`https://image.tmdb.org/t/p/original/${props.image}`}
          alt={props.title}
        />
        <p className="rating">{props.rating.toFixed(1)}</p>
      </div>
      <div className="flex flex-col space-y-2">
        <h3 className="font-bold text-lg">{props.title}</h3>
        <p className="text-slate-500 text-sm">
          {truncateString(props.overview, 50)}
        </p>
      </div>
    </div>
  );
};

export const RecBox = (props: MovieBox) => {
  return (
    <div className="flex space-x-4">
      <img
        className="rounded-xl w-2/5"
        src={`https://image.tmdb.org/t/p/original/${props.image}`}
        alt={props.title}
      />
      <div className="flex flex-col space-y-2">
        <h3 className="font-bold text-xl">{props.title}</h3>

        <p>{props.rating.toFixed(1)}</p>

        <p className="text-slate-500">{truncateString(props.overview, 200)}</p>
      </div>
    </div>
  );
};
