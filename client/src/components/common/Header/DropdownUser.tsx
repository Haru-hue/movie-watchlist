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
        className={`absolute right-0 mt-4 flex z-[999] flex-col rounded-sm border bg-secondary ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-0 w-full">
          <li className="border-b border-stroke p-5">
            <Link
              href="/profile"
              className="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out hover:text-violet-500 lg:text-base"
            >
              <Icon icon="ph:user" />
              <p className="whitespace-nowrap">My Profile</p>
            </Link>
          </li>
          <li className="p-5">
          <button onClick={() => handleLogout()} className="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out hover:text-violet-500 lg:text-base">
          <Icon icon="line-md:logout" />
            <p className="whitespace-nowrap">Log Out</p>
          </button>
        </li>
        </ul>
        
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
