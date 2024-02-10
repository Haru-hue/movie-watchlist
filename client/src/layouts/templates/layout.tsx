import Header from "@/components/header";
import { useAppDispatch, useAppSelector } from "@/hooks";
import SearchLayout from "../searchLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setMovieTerm } from "@/features/movieTerm";
import classNames from "classnames";
import { Icon } from "@iconify/react/dist/iconify.js";
import Sidebar from "@/components/sidebar";
import SearchModal from "@/components/searchModal";

function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const searchTerm = useAppSelector((state) => state.movie.term);
  const dispatch = useAppDispatch();
  const [collapseSidebar, setCollapseSidebar] = useState(false);

  return (
    <section>
      <div
        className={classNames({
          "grid min-h-screen": true,
          "grid-cols-sidebar": collapseSidebar,
          "grid-cols-sidebar-collapsed": !collapseSidebar,
          "transition-[grid-template-columns] duration-300 ease-in-out": true,
        })}
      >
        <Sidebar
          collapseSidebar={collapseSidebar}
          setCollapseSidebar={setCollapseSidebar}
        />
        <div>
          <Header />
          {searchTerm && <SearchModal/>}
          {children}
        </div>
      </div>
    </section>
  );
}

export default Layout;
