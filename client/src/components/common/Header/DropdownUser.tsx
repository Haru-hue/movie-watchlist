import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const router = useRouter()
  const handleLogout = () => {
    localStorage.clear();
    setUserInfo(null)
    router.push('/auth/signin')
  }
  const localUser = localStorage.getItem('localUser');
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
      // Update the userInfo state with the new value from local storage
      setUserInfo(localUser ? JSON.parse(localUser) : null);
    };

    // Add event listener for local storage changes
    window.addEventListener('storage', handleStorageChange);

    // Call the handler right away to populate the initial state
    handleStorageChange();

    // Cleanup the event listener
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
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {userInfo.firstname} {userInfo.lastname}
          </span>
          <span className="block text-xs">Full Stack Developer</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <Image
            className="rounded-full"
            width={112}
            height={112}
            src={"/images/user/user-01.png"}
            alt="User"
          />
        </span>
      </Link> : (
        <Link href='/auth/signin'>
          <Icon icon="ph:user" className="text-3xl" />
        </Link>
      )}

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border bg-violet-500 border-stroke shadow-default dark:border-strokedark dark:bg-boxdark ${
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
