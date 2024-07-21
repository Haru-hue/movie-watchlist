import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleSidebar } from "@/store/features/sidebar";
import { Icon } from "@iconify/react/dist/iconify.js";

const Header = () => {

  return (
    <header className="top-0 flex w-fulldrop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between p-4 shadow-2 md:px-6 2xl:px-11">
        <div>
          Logo
        </div>
        <div className="flex items-center gap-3 2xsm:gap-7">
        <div className="relative w-full">
          <input
            type="text"
            className="searchBox"
            placeholder="Search for what you like"
            // onChange={(e) => handleChange(e)}
            // value={movie}
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
