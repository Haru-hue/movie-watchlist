import { Icon } from "@iconify/react/dist/iconify.js";

function Header() {
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
          <div className="userIcon">
            Usernam
          </div>
      </section>
    </div>
  );
}

export default Header;
