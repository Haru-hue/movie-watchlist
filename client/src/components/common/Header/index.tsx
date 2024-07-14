import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateSearchTerm } from "@/store/features/search";
import { toggleSidebar } from "@/store/features/sidebar";
import { Icon } from "@iconify/react/dist/iconify.js";

const Header = () => {
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen);
  const searchTerm = useAppSelector((state) => state.search)
  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchTerm(e.target.value));
  }

  return (
    <header className="top-0 z-999 flex w-full drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 ">
          {/* <!-- Hamburger Toggle BTN --> */}
          {!isSidebarOpen && (
            <button
              onClick={() => dispatch(toggleSidebar())}
              aria-hidden={!isSidebarOpen}
              aria-controls="sidebar"
            >
              <Icon icon="iconoir:menu" className="text-2xl" />
            </button>
          )}
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>
        <div className="flex items-center gap-3 2xsm:gap-7">
        <div className="relative w-full">
          <input
            type="text"
            className="searchBox"
            placeholder="Search for what you like"
            onChange={(e) => handleChange(e)}
            value={searchTerm}
          />
          <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-4">
            <Icon icon="iconoir:search" />
          </div>
        </div>
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <DarkModeSwitcher /> */}
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
