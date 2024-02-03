import Spinner from '@/components/Spinner'
import { useAppSelector } from '@/hooks'
import getSearchDetails from '@/lib/getSearchDetails'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import NoImage from '@/assets/NoImage.png'

function SearchLayout() {
  const searchTerm = useAppSelector((state) => state.movie.term)
  const [page, setPage] = useState<number>(1)
  const [movies, setMovies] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true)
      const results = await getSearchDetails(searchTerm, page)
      setMovies(results);
      setIsLoading(false)
    };
    fetchMovies();
  }, [searchTerm, page]);

  console.log(movies)

  return (
    <div>
      {isLoading ? <Spinner/> : (
        <section className='px-10'>
          <div className="flex justify-between">
            <div>Sort By</div>
            <div>We found <span className="font-bold">{Number(movies?.total_results).toLocaleString()}</span> results</div>
          </div>
          <div className="grid grid-cols-6 gap-10 max-w-fit py-10">
          {movies?.results.map((movie: any) => (
            <Link href={`/movie/${movie?.id}`}>
                <div className="flex flex-col max-w-fit gap-1" key={movie?.id}>
                  <img
                    src={movie?.poster_path ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}`: NoImage.src}
                    className="w-96 h-full object-cover"
                    alt=""
                  />
                  <p className="text-lg font-light">{movie?.title}</p>
                </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-end py-2">
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <a href="#" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <span className="sr-only">Previous</span>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
          </svg>
        </a>
      
        <a href="#" aria-current="page" className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
        <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
        <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
        <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
        <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">9</a>
        <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">10</a>
        <a href="#" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <span className="sr-only">Next</span>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
          </svg>
        </a>
      </nav>
          
          
        </div>
      </section>
      )}
    </div>
  )
}

export default SearchLayout