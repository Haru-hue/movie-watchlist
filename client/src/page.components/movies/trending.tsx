"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "@/apis/movie";
import { LayoutView } from "@/components/layouts";
import { Loader, Spinner } from "@/components/common/Loader";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Icon } from "@iconify/react/dist/iconify.js";
import { MovieInfoBox } from "@/components/MovieInfoBox";

export const TrendingMovies = () => {
  const [layout, setLayout] = useState('grid')
  const {
    data: movies,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies", ""],
    queryFn: ({ pageParam = "&page=1" }: { pageParam: string }) =>
      getTrendingMovies(pageParam),
    getNextPageParam: (lastPage) => {
      const maxPageNumber = lastPage?.total_pages;
      const nextPageNumber = lastPage?.page + 1;
      return nextPageNumber <= maxPageNumber
        ? `&page=${nextPageNumber}`
        : undefined;
    },
    initialPageParam: "&page=1",
  });

  const LIST_OF_MOVIES = movies?.pages?.flatMap((movie) =>
    movie?.results?.map((item: Movie) => item)
  );
  const handleScroll = () => {
    const wrap = document?.getElementById("newMovies");
    if (wrap) {
      const { clientHeight, scrollTop, scrollHeight } = wrap;
      if (!isFetchingNextPage && clientHeight + scrollTop >= scrollHeight) {
        return hasNextPage ? fetchNextPage() : null;
      }
    }
  };  

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isError || isFetchNextPageError) {
    toast.error('An error occurred while fetching data')
  }


  return (
    <div>
      <Toaster position="top-right" containerClassName="font-bold" />
      {isLoading ? (
        <Spinner />
      ) : (
        <LayoutView>
          <section
            className="flex flex-col ml-6 px-6 space-y-10 h-screen overflow-y-scroll no-scrollbar"
            onScroll={handleScroll}
            id="newMovies"
          >
            <div className="flex justify-between">
            <h1 className="text-3xl font-black">Trending Movies</h1>
            <span className="flex gap-4 text-2xl cursor-pointer">
              <Icon icon="bxs:grid" onClick={() => setLayout('grid')} />
              <Icon icon="eva:grid-fill" onClick={() => setLayout('gridStack')} />
              <Icon icon="ic:baseline-list" onClick={() => setLayout('list')} />
            </span>
          </div>
             <MovieInfoBox layout={layout} movies={LIST_OF_MOVIES}/>
              {isFetchingNextPage && <Loader size={30} />}
              {isFetchingNextPage && <p>An error occurred</p>}
          </section>
        </LayoutView>
      )}
    </div>
  );
};
