import { getBase64FromUrl } from "@/utils/convertBase64";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";

type DropzoneProps = {
    setImageURL: Dispatch<SetStateAction<any>>
    name: 'avatarURL' | 'backgroundImageURL'
}

export const useImageDropzone = ({ setImageURL, name }: DropzoneProps) => {
    return useDropzone({
        accept: {
          "image/*": [],
        },
        maxFiles: 1,
        onDrop: useCallback((acceptedFiles: File[]) => {
          const file = acceptedFiles[0];
          const objectUrl = URL.createObjectURL(file);
          getBase64FromUrl(objectUrl).then(res => {
            const newFile = Object.assign({ image: res }, file)

            setImageURL((prev: any) => ({
              ...prev,
              [name]: newFile
            }))

            URL.revokeObjectURL(objectUrl)
          })
        }, [])
    })
}