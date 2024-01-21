import getFirstLetters from "@/utils/getFirstLetter";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

function UserBox({ name, username }: { name: string; username: string }) {
  const [mode, setMode] = useState('')

  return (
    <section className="border border-blue-400 rounded-2xl">
      <div className="flex flex-col">
        <div className="w-full h-60 bg-slate-500 rounded-t-2xl movieBG"></div>
        <div className="w-32 h-32 bg-red-400 absolute mt-40 ml-12 rounded-full flex justify-center items-center">
          <span className="text-5xl font-bold">{getFirstLetters(name)}</span>
        </div>
        <div className="flex items-center justify-between ml-40 mt-6 px-10 mb-20">
          <span>
            <h2 className="text-3xl font-bold">{name}</h2>
            <p>@{username}</p>
          </span>

          <Dropdown />
        </div>
      </div>
    </section>
  );
}

export default UserBox;

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <div>
        <Icon
          icon="heroicons:ellipsis-vertical-20-solid"
          className="text-3xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Edit Profile
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Settings
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
