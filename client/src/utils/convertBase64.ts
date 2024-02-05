export const getBase64FromUrl = async (url: string | URL | Request) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};

export const extractBase64 = (file: FileWithImage) =>
  file?.image !== undefined ? file.image : null;