'use client'
import cn from "classnames";
import { ReactNode, useState } from "react";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import { SearchModal } from "../SearchModal";
import { useAppSelector } from "@/store";

export default function LayoutView ({ children }: { children: ReactNode}) {
  const searchTerm = useAppSelector((state) => state.search)

  return (
    <section>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          {searchTerm && <SearchModal/>}
          <div className="p-2">{children}</div>
        </div>
      </div>
    </section>
  );
}
