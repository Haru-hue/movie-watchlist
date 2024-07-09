import { Loader, Spinner } from "@/components/common/Loader";
import { encodeFileToBase64 } from "@/utils/encodeBase64.";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface ProfilePictureProps {
  files: ImageObject[];
  isLoading: boolean;
  setFiles: (files: ImageObject[]) => void;
}

export const UploadProfilePicture = ({
  files,
  isLoading,
  setFiles,
}: ProfilePictureProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    onDrop: useCallback(async (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) =>
        encodeFileToBase64(file)
          .then((res) => {
            setFiles([
              Object.assign(
                { image: res },
                {
                  preview: URL.createObjectURL(file),
                }
              ),
            ]);
          })
          .catch((err) => {
            return err;
          })
      );
    }, []),
  });

  const thumbs = files
    ? files[0]?.preview
      ? files.map((file: ImageObject, _index) => {
          return (
            <Image
              className="rounded-full w-28 h-28 object-cover border-2 border-white"
              src={file.preview}
              width={160}
              height={160}
              alt="profile"
            />
          );
        })
      : null
    : null;

  return (
    <div>
      {isLoading ? (
        <Loader size={30} />
      ) : !thumbs?.length ? (
        <Image
          className="rounded-full w-28 h-28 object-cover border-2 border-white"
          src={"/images/image-avatar-avatar-fallback.svg"}
          width={160}
          height={160}
          alt="profile"
        />
      ) : (
        <div className="cursor-pointer" {...getRootProps()}>
          {thumbs}
        </div>
      )}
    </div>
  );
};
