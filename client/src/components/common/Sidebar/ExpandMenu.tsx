"use client";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;
import { useSidebar } from "@/hooks/useSidebar";
import { useState } from "react";
import cn from "classnames";
import { FiChevronRight } from "react-icons/fi";
import s from './style/item.module.css'

type Props = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  name?: string;
};

const ExpandMenu = (props: Props) => {
  const { children, icon, name } = props;
  const [open, setOpen] = useState(false);
  const { isSidebarOpen } = useSidebar((state) => state);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="">
      <CollapsibleTrigger asChild className="group rounded-sm px-3 py-2  ">
        {isSidebarOpen ? (
          <div className="flex w-full items-center text-gray-2 ">
            {icon}
            <div
              className={cn(
                "flex w-full transform items-center justify-between duration-300 ease-in",
              )}
            >
              <p
                className={cn(
                  "ml-2 text-lg text-gray-2 group-hover:text-white ",
                  {},
                )}
              >
                {name}
              </p>
              <FiChevronRight
                className={cn(
                  "text-gary-2 ml-2 h-4 w-4  duration-300 ease-in-out group-hover:rotate-90 ",
                  {
                    "rotate-90": open,
                  },
                )}
              />
            </div>
          </div>
        ) : <div>{icon}</div>}
      </CollapsibleTrigger>
      <CollapsibleContent className={s.CollapsibleContent}>
        <div className="px-3">{isSidebarOpen && children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ExpandMenu;
