"use client";
import dynamic from "next/dynamic";
import { Spinner } from "../Loader";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "@/apis/movie";
import useMediaQuery from "@/utils/hooks/useMediaQuery";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

export const MainPageCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slidesCount, setSlidesCount] = useState(0);
  const movieImagePaths = useQuery({
    queryKey: ["movies"],
    queryFn: () => getMovies("upcoming"),
  });
  const isNotDesktop = useMediaQuery("(max-width: 1023px)");
  const carouselImages = movieImagePaths?.data?.results
    ?.slice(0, isNotDesktop ? 10 : 6)
    .map((movie: Movie, idx: number) => {
      return (
        <SwiperSlide>
          <img
            className={`carouselImg embla__slide`}
            alt={movie?.title}
            src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            key={movie?.id}
          />
        </SwiperSlide>
      );
    });

  useEffect(() => {
    if (carouselImages) {
      setSlidesCount(carouselImages.length);
    }
  }, [carouselImages]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <>
      <div className="lg:hidden">
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container gap-4">{carouselImages}</div>
          </div>
          <div className="embla__controls flex w-full items-center justify-center pt-4">
            <div className="embla__dots">
              {Array.from({ length: slidesCount }).map((_, index) => (
                <button
                  key={index}
                  className={`embla__dot ${
                    index === selectedIndex ? "is-selected" : ""
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                >
                  <Icon
                    className="sm:text-4xl"
                    icon={
                      index === selectedIndex
                        ? "octicon:dot-fill-16"
                        : "octicon:dot-24"
                    }
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-lg:hidden">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: true,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
            <div className="swiper-button-prev slider-arrow absolute top-40 bg-secondary p-2 rounded-full left-2 z-50">
              <Icon className="text-xl cursor-pointer" icon="bi:chevron-left" />
            </div>
          {carouselImages}
          <div className="swiper-button-next slider-arrow absolute top-40 bg-secondary p-2 rounded-full right-2 z-50">
              <Icon className="text-xl cursor-pointer" icon="bi:chevron-right" />
            </div>
        </Swiper>
      </div>
    </>
  );
};
