import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { encodeFileToBase64 } from '../encodeBase64.';

const useImageDropzone = (userFile: string | null) => {
  const [image, setImage] = useState<ImageObject[] | string | null>(userFile);

  const handleDrop =  useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file =>
      encodeFileToBase64(file)
        .then(res => {
          setImage([
            Object.assign(
              {image: res},
              {
                preview: URL.createObjectURL(file),
              }
            ),
          ]);
        })
        .catch(err => {
          return err;
        })
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
        "image/*": [],
      },
      maxFiles: 1,
    onDrop: handleDrop,
  });

  return {
    image,
    getRootProps,
    getInputProps,
  };
};

export default useImageDropzone;
