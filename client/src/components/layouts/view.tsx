"use client";
import cn from "classnames";
import { ReactNode, useState } from "react";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import { SearchModal } from "../SearchModal";
import { useAppDispatch, useAppSelector } from "@/store";
import ClickAwayListener from "react-click-away-listener";
import { updateSearchTerm } from "@/store/features/search";

export default function LayoutView({ children }: { children: ReactNode }) {
  const searchTerm = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const handleClickAway = () => {
    dispatch(updateSearchTerm(""));
  };
  return (
    <section>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          {searchTerm && <ClickAwayListener onClickAway={handleClickAway}>
            <SearchModal />
          </ClickAwayListener>}
          <div className="p-2">{children}</div>
        </div>
      </div>
    </section>
  );
}
