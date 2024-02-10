import Spinner from "@/components/Spinner";
import { useAppDispatch, useAppSelector } from "@/hooks";
import getSearchDetails from "@/lib/getSearchDetails";
import Link from "next/link";
import { useEffect, useState } from "react";
import NoImage from "@/assets/NoImage.png";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { setMovieTerm } from "@/features/movieTerm";

function SearchLayout() {
  const router = useRouter();
  const searchTerm = router.asPath.replace("/search?=", "");
  const dispatch = useAppDispatch()
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      const results = await getSearchDetails(searchTerm, page);
      setMovies(results);
      setIsLoading(false);
    };
    fetchMovies();
  }, [searchTerm, page]);

  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected + 1);
  };

  const handleLinkClick = () => {
    dispatch(setMovieTerm(''))
  }

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="px-10">
          <div className="flex justify-end gap-2">
            We found{" "}
            <span className="font-bold">
              {Number(movies?.total_results).toLocaleString()}
            </span>{" "}
            results
          </div>
          <div className="grid grid-cols-6 gap-10 max-w-fit py-10">
            {movies?.results.map((movie: any) => (
              <Link href={`/movie/${movie?.id}`} onClick={handleLinkClick}>
                <div className="flex flex-col max-w-fit gap-1" key={movie?.id}>
                  <img
                    src={
                      movie?.poster_path
                        ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}`
                        : NoImage.src
                    }
                    className="w-96 h-full object-cover"
                    alt=""
                  />
                  <p className="text-lg font-light">{movie?.title}</p>
                </div>
              </Link>
            ))}
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={movies?.results.length}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            className="flex justify-end gap-6 items-center"
            activeClassName="bg-slate-800 w-10 h-10 flex justify-center items-center rounded-full"
            forcePage={page - 1}
          />
        </section>
      )}
    </div>
  );
}

export default SearchLayout;
