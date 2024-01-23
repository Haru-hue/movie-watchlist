import { useImageDropzone } from "@/hooks/useImageDropzone";
import getFirstLetters from "@/utils/getFirstLetter";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

function UserBox({ name, username }: { name: string; username: string }) {
  const [mode, setMode] = useState("");
  const [selectedImage, setSelectedImage] = useState<{
    [key: string]: string | undefined;
  }>({
    avatarURL: "",
    backgroundImageURL: "",
  });

  const avatarDropzone = useImageDropzone({
    setImageURL: setSelectedImage,
    name: "avatarURL",
  });
  const backgroundImageURL = useImageDropzone({
    setImageURL: setSelectedImage,
    name: "backgroundImageURL",
  });

  return (
    <section className="border border-blue-400 rounded-2xl">
      <div className="flex flex-col">
        <div
          {...backgroundImageURL.getRootProps()}
          style={{
            backgroundImage: selectedImage.backgroundImageURL
              ? `url(${selectedImage.backgroundImageURL})`
              : "",
          }}
          className={`w-full h-60 bg-slate-400 rounded-t-2xl ${
            selectedImage.backgroundImageURL === "" ? "movieBG" : ""
          }`}
        >
          <div className="absolute right-16 top-16 bg-[#1D2939] rounded-full p-4">
            <input {...backgroundImageURL.getInputProps()} />
            <Icon className="text-4xl cursor-pointer" icon="bi:camera-fill" />
          </div>
        </div>
        <div
          {...avatarDropzone.getRootProps()}
          style={{
            backgroundImage: selectedImage.avatarURL
              ? `url(${selectedImage.avatarURL})`
              : "",
          }}
          className="w-32 h-32 bg-red-400 bg-cover bg-center absolute mt-40 ml-12 rounded-full flex justify-center items-center"
        >
          <div className="absolute -right-2 top-0 bg-[#1D2939] rounded-full p-3">
            <input {...avatarDropzone.getInputProps()} />
            <Icon className="text-2xl cursor-pointer" icon="bi:camera-fill" />
          </div>
          {!selectedImage.avatarURL && (
            <span className="text-6xl font-bold">{getFirstLetters(name)}</span>
          )}
        </div>
        <div className="flex items-center justify-between ml-36 mt-6 px-10 mb-20">
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
