import { Icon } from "@iconify/react/dist/iconify.js";
import cn from "classnames";
import React, { Dispatch, SetStateAction } from "react";
import { NavItems } from "./sidebar/navItems";
import Link from "next/link";
import { useRouter } from "next/router";

type SideBarProps = {
  collapseSidebar: boolean;
  navItems?: NavItem[];
  setCollapseSidebar: Dispatch<SetStateAction<boolean>>;
};

function Sidebar({ collapseSidebar, setCollapseSidebar }: SideBarProps) {
  const router = useRouter()

  return (
    <div className="bg-[#121429] text-white flex w-full justify-center">
      <div
        className={cn({
          "flex flex-col justify-between w-full": true,
        })}
      >
        <div
          className={cn({
            "flex items-center border-b border-b-indigo-800 w-full": true,
            "p-4 justify-between": collapseSidebar,
            "py-4 justify-center": !collapseSidebar,
          })}
        >
          {collapseSidebar && (
            <span className="whitespace-nowrap">My Logo</span>
          )}
          <Icon
            className={cn({
              "grid place-content-center": true,
              "hover:bg-indigo-800 ": true, // colors
              "w-10 h-10 rounded-full": true, // shape
            })}
            onClick={() => setCollapseSidebar(!collapseSidebar)}
            icon="ci:chevron-right"
          />
        </div>
        <nav className="flex-grow">
          <ul
            className={cn({
              "mt-6 flex flex-col gap-6": true,
            })}
          >
            {NavItems.map((item, index) => {
              const isActive = router.pathname === item.link;
              return (
                <li
                  key={index}
                  className={cn({
                    "text-indigo-100 hover:bg-indigo-500 flex w-full": true,
                    "transition-colors duration-300": true,
                    "rounded-md p-2 justify-center": !collapseSidebar,
                    "rounded-full mx-2 p-2": collapseSidebar,
                    "text-indigo-500 font-bold hover:bg-transparent": isActive
                  })}
                >
                  <Link href={`${item.link}`} className={`flex items-center ${collapseSidebar ? 'gap-4' : ''}`}>
                    {item.icon} <span>{collapseSidebar && item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
