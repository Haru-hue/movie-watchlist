import { setMovieTerm } from "@/features/movieTerm";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

function Header() {
  const movie = useAppSelector((state) => state.movie.term);
  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMovieTerm(e.target.value))
  }

  return (
    <div className="flex items-center justify-between p-6">
      <Link href={`/`}>
        <p>Movie</p>
      </Link>
      <section className="flex w-1/4 items-center space-x-4">
        <div className="relative w-full">
          <input
            type="text"
            className="searchBox"
            placeholder="Search for what you like"
            onChange={(e) => handleChange(e)}
            value={movie}
          />
          <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4">
            <Icon icon="iconoir:search" />
          </div>
        </div>
        {/* <Link href={user.username === '' ? `/login` : "/profile"}>
          <Icon icon="ep:user" className="text-2xl" />
        </Link> */}
      </section>
    </div>
  );
}

export default Header;
