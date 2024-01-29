import { Icon } from "@iconify/react/dist/iconify.js";
import cn from "classnames";
import React, { Dispatch, SetStateAction } from "react";

type SideBarProps = {
  collapseSidebar: boolean;
  setCollapseSidebar: Dispatch<SetStateAction<boolean>>;
};

function Sidebar({ collapseSidebar, setCollapseSidebar }: SideBarProps) {
  return (
    <div className="bg-[#121429] text-white flex w-full justify-center">
      <div
        className={cn({
            "flex items-center w-full h-20 border-b border-b-indigo-800": true,
            "p-4 justify-between": collapseSidebar,
            "py-4 justify-center": !collapseSidebar,
          })}
      >
      {collapseSidebar && <span className="whitespace-nowrap">My Logo</span>}
          <Icon
            className={cn({
                "grid place-content-center": true, // position
                "hover:bg-indigo-800 ": true, // colors
                "w-10 h-10 rounded-full": true, // shape
              })}
            onClick={() => setCollapseSidebar(!collapseSidebar)}
            icon="ci:chevron-right"
          />
      </div>
    </div>
  );
}

export default Sidebar;
