import { setMovieTerm } from "@/features/movieTerm";
import { useAppDispatch, useAppSelector } from "@/hooks";
import getSearchDetails from "@/lib/getSearchDetails";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import NoImage from "@/assets/NoImage.png";
import { formatReleaseYear } from "@/utils/formatDate";
import ClickAwayListener from "react-click-away-listener";

function SearchModal() {
  const [movies, setMovies] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const searchTerm = useAppSelector((state) => state.movie.term);
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMovieTerm(e.target.value));
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      const results = await getSearchDetails(searchTerm);
      setMovies(results);
      setIsLoading(false);
    };
    fetchMovies();
  }, [searchTerm]);

  useEffect(() => {
    setIsSearching(searchTerm !== '')
  }, [searchTerm])

  const handleClickAway = () => {
    console.log("Maybe close the popup");
    setIsSearching(false)
  };

  const handleLinkClick = () => {
    dispatch(setMovieTerm(''))
  }

  return (
    <div>
        {isSearching ? (
            <div className="fixed z-10 inset-0 overflow-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-[#1D2939] opacity-80"></div>
              </div>
              <ClickAwayListener onClickAway={handleClickAway}>
                <div className="inline-flex flex-col relative min-h-screen z-50 justify-center gap-6 p-10 ">
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="searchBox py-6 ps-10 rounded-full text-3xl"
                      placeholder="Search for what you like"
                      onChange={(e) => handleChange(e)}
                      value={searchTerm}
                      autoFocus
                    />
                    <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-10">
                      <Icon className="text-3xl" icon="iconoir:search" />
                    </div>
                  </div>
                  {isLoading ? null : (
                    <div className="grid gap-6 max-w-fit bg-slate-900 rounded-3xl">
                      {movies?.results.slice(0, 9).map((movie: any) => (
                        <Link className="contents" href={`/movie/${movie?.id}`} onClick={handleLinkClick}>
                          <div
                            className="flex hover:bg-slate-700 p-10 w-full gap-3"
                            key={movie?.id}
                          >
                            <img
                              src={
                                movie?.poster_path
                                  ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}`
                                  : NoImage.src
                              }
                              className="w-20 h-20 object-cover"
                              alt=""
                            />
                            <div className="inline-flex flex-col space-y-2 items-start">
                              <p className="text-xl font-medium">{movie?.title}</p>
                              <p className="text-md font-light">
                                {formatReleaseYear(movie?.release_date)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                      <div className="text-center py-4 hover:bg-slate-700">
                        <Link
                          className="w-full contents"
                          href={`/search?=${searchTerm}`}
                          onClick={handleLinkClick}
                        >
                          View all results for {`'${searchTerm}'`}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </ClickAwayListener>
            </div>
          </div>
        ): null}
    </div>
  );
}

export default SearchModal;
