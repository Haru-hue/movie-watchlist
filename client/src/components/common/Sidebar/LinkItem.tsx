import { useAppSelector } from "@/store";
import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  title: string;
  href: string;
};

const LinkItem = (props: Props) => {
  const { title } = props;
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen);
  const pathname = usePathname()

  return (
    <Link
      className={cn(`group relative flex items-center rounded-lg px-3 py-2 text-gray-3 duration-300 ease-in-out`, {
        "text-indigo-500 font-semibold": pathname === props.href,
        "hover:text-primary": pathname!== props.href,
        'gap-2.5': isSidebarOpen
      })}
      href={props.href}
    >
      {props.icon}
      <p>{isSidebarOpen && title}</p>
    </Link>
  );
};

export default LinkItem;
