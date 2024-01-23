import React, { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";

type DropzoneProps = {
    setImageURL: Dispatch<SetStateAction<{ [key: string]: string | undefined }>>
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
          setImageURL((prev) => ({
            ...prev,
            [name]: objectUrl
          }))
        }, [])
    })
}