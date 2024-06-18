import { useQuery } from "@tanstack/react-query";
import { getMovies } from "@/apis/movie";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import LayoutView from "../../layouts/view";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const MovieBrowseLayout = ({ movieKey }: { movieKey: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [page, setPage] = useState(1);
  const [addedParam, setAddedParam] = useState("");
  const movies = useQuery({
    queryKey: ["movies", addedParam],
    queryFn: () => getMovies(movieKey, addedParam),
  });

  const handlePagination = (event) => {
    const defaultQuery = {
      page: `${event.selected + 1}`,
    };

    setPage(event.selected + 1);

    const mergedQuery = {
      ...defaultQuery,
    };
    const routerQueries = new URLSearchParams(mergedQuery).toString();
    setAddedParam(`?${routerQueries}`);
    router.push(`${pathname}?${routerQueries}`);
  };

  return (
    <div>
      {movies.isLoading ? (
        <Spinner />
      ) : (
        <LayoutView>
          <div className="flex flex-col ml-6 px-6 space-y-10">
            <section>
              <div
                className="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
                id="newMovies"
              >
                {movies?.data.map((movie: Movie) => (
                    <Link
                      className="max-w-fit"
                      key={movie.id}
                      href={`/movie/${movie.id}`}
                    >
                      <img
                        className="rounded-lg w-60 h-80 object-cover"
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt={movie.title}
                      />
                      <h3 className="font-bold text-base pt-4">
                        {movie.title}
                      </h3>
                    </Link>
                  ))}
              </div>
            </section>
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePagination}
            // pageRangeDisplayed={5}
            pageCount={movies.data.length}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            className="flex justify-end gap-6 items-center"
            activeClassName="bg-slate-800 w-10 h-10 flex justify-center items-center rounded-full"
            forcePage={page - 1}
          />
        </LayoutView>
      )}
    </div>
  );
};