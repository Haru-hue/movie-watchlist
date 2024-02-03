import { useImageDropzone } from "@/hooks/useImageDropzone";
import { UPDATE_USER } from "@/utils";
import { extractBase64 } from "@/utils/convertBase64";
import getFirstLetters from "@/utils/getFirstLetter";
import { useMutation } from "@apollo/client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Dispatch, SetStateAction, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

interface DropdownProps {
  setMode: Dispatch<SetStateAction<string>>;
}

function UserBox(props: UserProfile) {
  const email = 'ukojoshy@gmail.com';
  const [mode, setMode] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<any>({
    avatarURL: props.avatarURL,
    backgroundImageURL: props.backgroundURL,
  });
  const [updateUser] = useMutation(UPDATE_USER, {
    fetchPolicy: 'no-cache',
    onCompleted: () => {
      toast.success('User updated succesfully', { duration: 5000});
    },
    onError: (error) => {
      console.error(error);
      if (error.graphQLErrors) {
        error.graphQLErrors.map(({ message }: any) => {
          toast.error(message);
        });
      }
    },
  });

  const avatarDropzone = useImageDropzone({
    setImageURL: setSelectedImage,
    name: "avatarURL",
  });
  const backgroundImageURL = useImageDropzone({
    setImageURL: setSelectedImage,
    name: "backgroundImageURL",
  });

  const handleUpdateProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMode('')
    const updatedFiles = extractBase64([selectedImage.backgroundImageURL, selectedImage.avatarURL])
    updateUser({
      variables: {
        email,
        avatarURL: updatedFiles[1],
        backgroundURL: updatedFiles[0]
      }
    })
  }

  console.log(props)

  return (
    <section className="border border-blue-400 rounded-2xl mx-10">
      <Toaster/>
      <div className="flex flex-col">
        <div
          {...(mode === "edit" ? backgroundImageURL.getRootProps() : {})}
          style={{
            backgroundImage: selectedImage.backgroundImageURL
              ? `url(${
                  typeof selectedImage.backgroundImageURL === "string"
                    ? selectedImage.backgroundImageURL
                    : selectedImage.backgroundImageURL?.image
                })`
              : "",
          }}
          className={`w-full h-60 bg-slate-400 rounded-t-2xl ${
            selectedImage.backgroundImageURL === "" ? "movieBG" : ""
          }`}
        >
          {mode === "edit" && (
            <div className="absolute right-16 top-16 bg-[#1D2939] rounded-full p-4">
              <input {...backgroundImageURL.getInputProps()} />
              <Icon className="text-4xl cursor-pointer" icon="bi:camera-fill" />
            </div>
          )}
        </div>
        <div
          {...(mode === "edit" ? avatarDropzone.getRootProps() : {})}
          style={{
            backgroundImage: selectedImage.avatarURL
              ? `url(${
                  typeof selectedImage.avatarURL === "string"
                    ? selectedImage.avatarURL
                    : selectedImage.avatarURL?.image
                })`
              : "",
          }}
          className="w-32 h-32 bg-red-400 bg-cover bg-center absolute mt-40 ml-12 rounded-full flex justify-center items-center"
        >
          {mode === "edit" && (
            <div className="absolute -right-2 top-0 bg-[#1D2939] rounded-full p-3">
              <input {...avatarDropzone.getInputProps()} />
              <Icon className="text-2xl cursor-pointer" icon="bi:camera-fill" />
            </div>
          )}
          {!selectedImage.avatarURL && (
            <span className="text-6xl font-bold">{getFirstLetters(props.name)}</span>
          )}
        </div>
        <div className={`flex items-center justify-between ml-36 mt-6 px-10 ${mode === 'edit' ? 'mb-8' : 'mb-16'}`}>
          <span>
            <h2 className="text-3xl font-bold">{props.name}</h2>
            <p>@{props.username}</p>
          </span>
          <Dropdown setMode={setMode} />
        </div>
        {mode === "edit" ? (
          <button className="border border-white self-end mb-8 mr-8 px-4 py-2 rounded-lg uppercase" onClick={handleUpdateProfile}>
            Done
          </button>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default UserBox;

const Dropdown = ({ setMode }: DropdownProps) => {
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
            <div
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => {
                setMode("edit");
                setIsOpen(false);
              }}
            >
              Edit Profile
            </div>
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
