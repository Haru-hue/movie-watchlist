import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const useImageDropzone = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
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
