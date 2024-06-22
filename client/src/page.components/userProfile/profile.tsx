'use client'
import { LayoutView } from "@/components/layouts";
import useImageDropzone from "@/utils/hooks/useImageDropzone";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

export const UserProfilePage = () => {
  const {
    image: profilePicture,
    getInputProps: getProfileProps,
    getRootProps: getProfProps,
  } = useImageDropzone();

  const {
    image: bgPicture,
    getInputProps: getBGProps,
    getRootProps: getBackgroundProps,
  } = useImageDropzone();

  const prof = profilePicture ? URL.createObjectURL(profilePicture) : null
  const bg = bgPicture ? URL.createObjectURL(bgPicture) : null
  
  return (
    <LayoutView>
      <div className="flex items-center justify-center">
        <div className="overflow-hidden rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-7xl">
          <div className="relative z-20 cursor-pointer" {...getBackgroundProps()}>
            <Image
              src={bg ?? "/images/movieBG.jpg"}
              alt="profile cover"
              className="max-h-60 w-full rounded-tl-sm rounded-tr-sm object-cover object-center opacity-50"
              width={970}
              height={350}
            />
          </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5" {...getProfProps()}>
            <div className="relative z-30 mx-auto -mt-20 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3 flex items-center justify-center">
              <div className="relative drop-shadow-2 cursor-pointer" >
                <Image
                  className="rounded-full w-36 h-36 object-cover"
                  src={prof ?? "/images/image-avatar-avatar-fallback.svg" }
                  width={160}
                  height={160}
                  alt="profile"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                Joshua Uko
              </h3>
            </div>
          </div>
        </div>
      </div>
    </LayoutView>
  );
};
