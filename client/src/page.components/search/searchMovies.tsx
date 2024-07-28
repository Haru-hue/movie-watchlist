"use client";
import { searchMovies } from "@/apis/movie";
import { Spinner } from "@/components/common/Loader";
import { LayoutView } from "@/components/layouts";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ReactPaginate from "react-paginate";

export const SearchMovies = () => {
  const params = useSearchParams();
  const [page, setPage] = useState(1);
  const searchTerm = params.toString();

  const allMovies = useQuery({
    queryKey: ["", page],
    queryFn: () => searchMovies(searchTerm, page),
  });

  const handlePagination = (event: { selected: number }) => {
    setPage(event.selected + 1);
  };

  return (
    <LayoutView>
      {allMovies.isLoading ? (
        <Spinner />
      ) : (
        <section className="px-10">
          <div className="flex justify-end gap-2">
            We found{" "}
            <span className="font-bold">
              {Number(allMovies?.data?.total_results).toLocaleString()}
            </span>{" "}
            results
          </div>
          <div className="grid grid-cols-6 gap-10 max-w-fit py-10">
            {allMovies?.data?.results.map((movie: Movie) => (
              <Link href={`/movie/${movie?.id}`}>
                <div className="flex flex-col max-w-fit gap-1" key={movie?.id}>
                  <img
                    src={
                      movie?.poster_path
                        ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}`
                        : "/images/NoImage.png"
                    }
                    className="w-96 h-96 object-cover"
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
            onPageChange={handlePagination}
            pageRangeDisplayed={5}
            pageCount={allMovies?.data?.total_pages}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            className="flex justify-end gap-6 items-center"
            activeClassName="bg-slate-800 w-10 h-10 flex justify-center items-center rounded-full"
            forcePage={page - 1}
          />
        </section>
      )}
    </LayoutView>
  );
};
