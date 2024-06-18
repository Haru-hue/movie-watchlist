import { useSidebar } from "@/hooks/useSidebar";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  title: string;
  href: string;
};

const LinkItem = (props: Props) => {
  const { title } = props;
  const isSidebarOpen = useSidebar((state) => state.isSidebarOpen);
  return (
    <Link
      className={`group relative flex items-center gap-2.5 rounded-sm px-3 py-2 font-medium text-gray-3 duration-300 ease-in-out  dark:hover:text-white `}
      href={props.href}
    >
      {props.icon}
      <p>{isSidebarOpen && title}</p>
    </Link>
  );
};

export default LinkItem;
