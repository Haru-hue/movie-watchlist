import { useState } from "react";

function ImageGrid({ images }: any) {
  const [imagesToShow, setImagesToShow] = useState(6);

  const handleSeeMoreClick = () => {
    if (imagesToShow >= images.length) {
      setImagesToShow(6);
    } else {
      setImagesToShow(images.length);
    }
  };
  return (
    <section>
      <h1 className="font-bold text-3xl py-10">Gallery</h1>
      <div className="grid grid-cols-3 gap-4 max-w-fit">
        {images?.slice(0, imagesToShow).map((image: any) => (
          <div key={image.id} className="relative">
            <img
              src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
      {images.length < imagesToShow ? null : <div className="flex items-center pt-10">
        <div className="w-full h-1 bg-gradient-to-r from-[#262f66] to-[#0c1124] rounded-lg shadow-lg flex" />
        <button
          className="uppercase border-2 py-2 px-4 rounded-lg text-nowrap font-semibold"
          onClick={handleSeeMoreClick}
        >
          {imagesToShow >= images?.length ? "Show less" : "See Gallery"}
        </button>
      </div>}
    </section>
  );
}

export default ImageGrid;
