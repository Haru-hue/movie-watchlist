import { useState } from "react";

function CastList({ cast }: any) {
  const [numCastMembers, setNumCastMembers] = useState(5);

  const handleSeeMoreClick = () => {
    if (numCastMembers >= cast.length) {
      setNumCastMembers(5);
    } else {
      setNumCastMembers(cast.length);
    }
  };

  return (
    <div>
      <section>
        <h1 className="font-bold text-3xl py-10">Cast</h1>
        <div className="grid grid-cols-5 gap-10 max-w-fit">
          {cast?.slice(0, numCastMembers).map((crew: any) => (
            <div className="flex flex-col max-w-fit gap-1" key={crew?.id}>
              <img
                src={crew?.profile_path ? `https://image.tmdb.org/t/p/original/${crew?.profile_path}`: '/images/noImage.png'}
                className="w-72 object-cover"
                alt=""
              />
              <p className="text-lg 2xl:text-xl font-semibold pt-4">{crew?.name}</p>
              <span className="text-slate-400">as {crew?.character}</span>
            </div>
          ))}
        </div>
      </section>
      <div className="flex items-center pt-12">
        <div className="w-full h-1 bg-gradient-to-r from-[#262f66] to-[#0c1124] rounded-lg shadow-lg flex" />
        <button
          className="uppercase border-2 py-2 px-4 rounded-lg text-nowrap font-semibold"
          onClick={handleSeeMoreClick}
        >
          {numCastMembers >= cast?.length ? "Show less" : "See full cast"}
        </button>
      </div>
    </div>
  );
}

export default CastList;
