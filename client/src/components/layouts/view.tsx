'use client'
import cn from "classnames";
import { ReactNode, useState } from "react";
import { Sidebar } from "../Sidebar";

export default function LayoutView ({ children }: { children: ReactNode}) {
  // const router = useRouter();
  // const searchTerm = useAppSelector((state) => state.movie.term);
  // const dispatch = useAppDispatch();
  const [collapseSidebar, setCollapseSidebar] = useState(false);

  return (
    <section>
      <div
        className={cn({
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
        <div className="pb-4">
          {/* <Header /> */}
          {/* {searchTerm && <SearchModal/>} */}
          {children}
        </div>
      </div>
    </section>
  );
}
