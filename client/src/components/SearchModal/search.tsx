import { searchMovies } from "@/apis/movie";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateSearchTerm } from "@/store/features/search";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import ClickAwayListener from "react-click-away-listener";
import { Spinner } from "../common/Loader";
import Link from "next/link";
import dayjs from "dayjs";

function SearchModal() {
  const searchTerm = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const allMovies = useQuery({
    queryKey: ["movies", searchTerm],
    queryFn: () => searchMovies(searchTerm),
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchTerm(e.target.value));
  };
  const handleClickAway = () => {
    dispatch(updateSearchTerm(""));
  };

  return (
    <div className="fixed z-10 inset-0 overflow-auto w-full">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-[#1D2939] opacity-80"></div>
          </div>
          <div className="inline-flex flex-col relative min-h-screen z-50 justify-center gap-6 p-10 ">
              <div className="relative w-full">
                <input
                  type="text"
                  className="searchBox w-full max-w-xl py-6 ps-10 rounded-full text-lg lg:text-3xl"
                  placeholder="Search for what you like"
                  onChange={handleChange}
                  value={searchTerm.trim()}
                  autoFocus
                />
                <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-10">
                  <Icon className="text-3xl" icon="iconoir:search" />
                </div>
              </div>
              {allMovies.isLoading ? (
                <Spinner />
              ) : (
                <div className="grid gap-6 max-w-fit bg-slate-900 rounded-3xl max-h-96 overflow-auto">
                  {allMovies?.data?.results?.slice(0, 9).map((movie: any) => (
                    <Link className="contents" href={`/movie/${movie?.id}`} onClick={handleClickAway}>
                      <div
                        className="flex hover:bg-slate-700 p-10 w-full gap-3"
                        key={movie?.id}
                      >
                        <img
                          src={
                            movie?.poster_path
                              ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}`
                              : "/images/NoImage.png"
                          }
                          className="w-20 h-20 object-cover"
                          alt=""
                        />
                        <div className="inline-flex flex-col space-y-2 items-start">
                          <p className="text-xl font-medium">{movie?.title}</p>
                          <p className="text-md font-light">
                            {dayjs(movie?.release_date).format("YYYY")}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  {searchTerm.trim() && <div className="text-center p-4 hover:bg-slate-700">
                    <Link
                      className="w-full contents"
                      href={`/search?=${searchTerm}`}
                      onClick={handleClickAway}
                    >
                      View all results for {`'${searchTerm}'`}
                    </Link>
                  </div>}
                </div>
              )}
            </div>
        </div>
      </div>
  );
}

export default SearchModal;