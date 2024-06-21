'use client'
import cn from "classnames";
import { ReactNode, useState } from "react";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";

export default function LayoutView ({ children }: { children: ReactNode}) {
  // const router = useRouter();
  // const searchTerm = useAppSelector((state) => state.movie.term);
  // const dispatch = useAppDispatch();
  const [collapseSidebar, setCollapseSidebar] = useState(false);

  return (
    <section>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={collapseSidebar} setSidebarOpen={setCollapseSidebar} />
          {/* {searchTerm && <SearchModal/>} */}
          <div className="p-2">{children}</div>
        </div>
      </div>
    </section>
  );
}
