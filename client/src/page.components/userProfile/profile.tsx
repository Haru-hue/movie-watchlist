"use client";
import { Spinner } from "@/components/common/Loader";
import { LayoutView } from "@/components/layouts";
import { UPDATE_USER } from "@/constants/queries";
import { UploadProfilePicture } from "@/ui-lib/ui-lib.components/UploadProfilePicture";
import { encodeFileToBase64 } from "@/utils/encodeBase64.";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { useMutation } from "@apollo/client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";

export const UserProfilePage = () => {
  const router = useRouter()
  const [localUser] = useLocalStorage("localUser") as User[];
  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    onCompleted: (res) => {
      toast.success(res.updateUser.message);
      localUser ? localStorage.setItem("localUser", JSON.stringify({...localUser, avatarURL: res.updateUser.user.avatarURL })): null
      setTimeout(() => {
        window.location.reload()
      }, 500)
    },
    onError: (error) => {
      toast.error(error?.message ?? 'An error occured')
    }
  })
  const onProfileChange = (file: ImageObject[]) => {
    updateUser({
      variables: {
        email: localUser?.email,
        avatarURL: file?.[0]?.image,
      }
    })
  }

  useEffect(() => {
    if (!localUser) {
      router.push('/auth/login')
    }
  }, [localUser])


  return (
    <LayoutView>
      <Toaster/>
      <div className="flex flex-col gap-20">
        <div className="self-center -overflow-hidden rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-7xl">
          <div
            className="relative"
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
            <UploadProfilePicture files={[{ preview: localUser?.avatarURL }]} isLoading={loading} setFiles={onProfileChange}  />
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {localUser?.name}
              </h3>
              {/* <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {localUser?.username}
              </h3> */}
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
