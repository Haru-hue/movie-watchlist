import { useAppSelector } from "@/hooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

function Header() {
  const user = useAppSelector((state) => state.users.userInfo);
  console.log(user.username === '')

  return (
    <div className="flex items-center justify-between">
      <p>Movie</p>
      <section className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            className="searchBox"
            placeholder="Search for what you like"
          />
          <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4">
            <Icon icon="iconoir:search" />
          </div>
        </div>
        <Link href={user.username === '' ? `/login` : "/profile"}>
          <Icon icon="ep:user" className="text-2xl" />
        </Link>
      </section>
    </div>
  );
}

export default Header;
