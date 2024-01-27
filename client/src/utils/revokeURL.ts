export const revokeURLs = (urls: (string | undefined)[]) => {
  urls.forEach((url) => {
    if (url) {
      URL.revokeObjectURL(url);
    }
  });
};
