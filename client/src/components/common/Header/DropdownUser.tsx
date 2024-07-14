import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import useLocalStorage from "@/utils/hooks/useLocalStorage";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [localUser] = useLocalStorage('localUser') as User[];
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const router = useRouter()
  const handleLogout = () => {
    localStorage.clear();
    setUserInfo(null)
    router.push('/auth/login')
  }


  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  useEffect(() => {
    const handleStorageChange = () => {
      setUserInfo(localUser ? localUser : null);
    };
    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [localUser]);

  return (
    <div className="relative">
      {userInfo ? <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
       <span className="h-12 w-12 rounded-full">
          <Image
            className="h-12 w-12 object-cover rounded-full"
            width={112}
            height={112}
            src={userInfo?.avatarURL ? userInfo.avatarURL : ''}
            alt="User"
          />
        </span>
      </Link> : (
        <Link href='/auth/login'>
          <Icon icon="ph:user" className="text-2xl" />
        </Link>
      )}

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 z-50 flex-col rounded-sm border bg-violet-500 border-stroke shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              href="/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <Icon icon="ph:user" />
              Dev's Profile
            </Link>
          </li>
          {/* <li>
            <Link
              href="/settings"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <PiGear size={22} />
              Account Settings
            </Link>
          </li> */}
        </ul>
        <button onClick={() => handleLogout()} className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
        <Icon icon="line-md:logout" />
          Log Out
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
