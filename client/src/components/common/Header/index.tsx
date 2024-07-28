import DropdownUser from "./DropdownUser";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateSearchTerm } from "@/store/features/search";
import { toggleSidebar } from "@/store/features/sidebar";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const Header = () => {
  const searchTerm = useAppSelector((state) => state.search);
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen);
  const dispatch = useAppDispatch();

  return (
    <header className="top-0 flex w-fulldrop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between p-4 shadow-2 md:px-6 2xl:px-11">
      <Link href='/'>
        <Icon className="text-5xl" icon="fluent-emoji:movie-camera" />
      </Link>
        <div className="flex items-center gap-6 w-full max-w-md 2xsm:gap-7">
          <div className="relative w-full">
            <input
              type="text"
              className="searchBox w-full max-sm:hidden"
              placeholder="Search for what you like"
              onChange={(e) => dispatch(updateSearchTerm(e.target.value))}
              value={searchTerm}
            />
            <div className="absolute inset-y-0 end-2 flex items-center sm:pointer-events-none sm:pe-4">
              <Icon className="max-sm:text-2xl" icon="iconoir:search" onClick={() => dispatch(updateSearchTerm(" "))} />
            </div>
          </div>
          <DropdownUser />
          {!isSidebarOpen && <span className="text-3xl lg:hidden" onClick={() => dispatch(toggleSidebar())}><Icon icon="material-symbols-light:menu" /></span>}
        </div>
      </div>
    </header>
  );
};

export default Header;
