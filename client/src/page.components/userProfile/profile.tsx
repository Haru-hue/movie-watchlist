"use client";
import { LayoutView } from "@/components/layouts";
import { UPDATE_USER } from "@/constants/queries";
import { encodeFileToBase64 } from "@/utils/encodeBase64.";
import useImageDropzone from "@/utils/hooks/useImageDropzone";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { useMutation } from "@apollo/client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { Key, useEffect, useState } from "react";

export const UserProfilePage = () => {
  const [localUser] = useLocalStorage("localUser") as User[];
  const { image: profilePicture, getRootProps: getProfProps } =
    useImageDropzone(localUser?.avatarURL);
  const { image: bgPicture, getRootProps: getBackgroundProps } =
    useImageDropzone(localUser?.backgroundURL);

  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER)

  const onProfileChange = (name: string, file: ImageObject[]) => {
    updateUser({
      variables: {
        email: localUser?.email,
        [name]: file?.[0]?.image,
      }
    })
  }

  useEffect(() => {
    if (profilePicture) {
      onProfileChange('avatarURL', (profilePicture as ImageObject[]))
    } else {
      onProfileChange('backgroundURL', (bgPicture as ImageObject[]))
    }
  }, [profilePicture, bgPicture])
  console.log(profilePicture, bgPicture)

  return (
    <LayoutView>
      <div className="flex flex-col gap-20">
        <div className="self-center -overflow-hidden rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-7xl">
          <div
            className="relative z-20 cursor-pointer"
            {...getBackgroundProps()}
          >
            <Image
              src={"/images/movieBG.jpg"}
              alt="profile cover"
              className="max-h-60 w-full rounded-tl-sm rounded-tr-sm object-cover object-center opacity-50"
              width={970}
              height={350}
            />
          </div>
          <div className="px-4 pb-6 lg:pb-8 xl:pb-11.5 flex items-center gap-6 relative -mt-10 z-50">
            <div className="drop-shadow-2 cursor-pointer" {...getProfProps()}>
              <Image
                className="rounded-full w-28 h-28 object-cover border-2 border-white"
                src={(profilePicture?.[0] as ImageObject)?.preview ?? "/images/image-avatar-avatar-fallback.svg"}
                width={160}
                height={160}
                alt="profile"
              />
            </div>
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {localUser?.name}
              </h3>
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {localUser?.username}
              </h3>
            </div>
          </div>
        </div>
        <section className="flex flex-col gap-6">
          {localUser?.watchlist && localUser?.watchlist.length > 0 ? (
            <></>
          ) : (
            <Link href='/browse' className="text-2xl font-bold text-center flex self-center items-center gap-2">
              <p>You have not added any movies to your watchlist</p>
              <Icon icon="octicon:feed-plus-16" />
            </Link>
          )}
        </section>
      </div>
    </LayoutView>
  );
};
