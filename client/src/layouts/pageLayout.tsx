"use client";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import EmblaCarousel from "@/components/gallery";
import { EmblaOptionsType } from "embla-carousel-react";
import getMovieDetails from "@/lib/getMovieDetails";
import { MovieRecBox } from "@/components/movieBox";
import { Icon } from "@iconify/react/dist/iconify.js";
import ModalVideo from "react-modal-video";
import duration from "dayjs/plugin/duration";
import CircularProgress from "@/components/circularProgressBar";

dayjs.extend(duration);

export default function PageLayout({ movieId }: { movieId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [movieData, setMovieData] = useState<MovieData>({
    recommendations: [],
  });

  useEffect(() => {
    const fetchNewMovies = async () => {
      const [data, credits, gallery, recommendations, videos] =
        await Promise.all([
          getMovieDetails(movieId),
          getMovieDetails(movieId, "credits"),
          getMovieDetails(movieId, "images"),
          getMovieDetails(movieId, "recommendations"),
          getMovieDetails(movieId, "videos"),
        ]);

      setMovieData((prev) => ({
        ...prev,
        data: data,
        credits: credits,
        gallery: gallery,
        recommendations: recommendations?.results,
        video: videos?.results?.[0],
      }));
    };
    fetchNewMovies();
  }, []);

  const date = movieData?.data?.release_date;
  const releaseDate = dayjs(date).format("MMMM D, YYYY");
  const director = movieData?.credits?.crew.filter(
    (crew) => crew.job === "Director"
  );
  const writers = movieData?.credits?.crew.filter(
    (crew) => crew.job === "Screenplay"
  );

  const gallery: string[] = (movieData?.gallery?.backdrops || [])
    .slice(1, 6)
    .map((image) => `https://image.tmdb.org/t/p/original/${image.file_path}`);
  const moviePoster = movieData?.gallery?.posters?.[0].file_path;

  const OPTIONS: EmblaOptionsType = {};
  const SLIDE_COUNT = gallery.length;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  console.log(movieData, writers);

  const runtime = movieData?.data?.runtime ?? 0;
  const formattedRuntime = dayjs.duration(runtime, "minutes");
  const movieRuntime = formattedRuntime.format("H[h] mm[mins]");
  const rating = movieData?.data?.vote_average.toFixed(1);
  const progressRating = Number(rating) * 10;

  return (
    <section>
      <ModalVideo
        isOpen={isOpen}
        channel="youtube"
        onClose={() => setIsOpen(false)}
        videoId={movieData?.video?.key}
      />
      <div
        className="movieBanner"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
          url('https://image.tmdb.org/t/p/original/${movieData?.gallery?.backdrops?.[0].file_path})`,
        }}
      >
        <div className="flex h-full items-end p-8 gap-20">
          <div className="flex gap-8 flex-col w-1/3">
            <h2 className="text-4xl uppercase font-bold">
              {movieData?.data?.title}
            </h2>
            <div className="font-light">{movieData?.data?.overview}</div>
            <span className="flex items-center gap-8">
              <p className="uppercase">Watch Trailer</p>
              <span
                className="p-3 flex items-center justify-center rounded-full border-2 cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <Icon className="te" icon="solar:play-bold" />
              </span>
            </span>
          </div>
          <div className="grid grid-cols-3 gap-12 w-1/3 pb-10">
            <span className="flex flex-col">
              <p className="text-slate-400 uppercase">Genre</p>
              <div className="flex gap-1">
                {movieData?.data?.genres.map((genre, index, array) => (
                  <div key={genre.id}>
                    <p>
                      {genre.name}
                      <span>{index !== array.length - 1 && ","}</span>
                    </p>
                  </div>
                ))}
              </div>
            </span>
            <span className="flex flex-col">
              <p className="text-slate-400 uppercase">Runtime</p>
              <p>{movieRuntime}</p>
            </span>
            <span className="flex flex-col">
              <p className="text-slate-400 uppercase">Country</p>
              {movieData?.data?.production_countries?.map((country) => (
                <h3 key={country.id}>{country.iso_3166_1}</h3>
              ))}
            </span>
            <span className="flex flex-col">
              <p className="text-slate-400 uppercase">Release Date</p>
              <p>{releaseDate}</p>
            </span>
            <span className="flex flex-col">
              <p className="text-slate-400 uppercase">Director</p>
              <p>
                {director?.map((crew) => (
                  <span>{crew.name}</span>
                ))}
              </p>
            </span>
            <span className="flex flex-col">
              <p className="text-slate-400 uppercase">Writers</p>
              <p>
                {writers?.map((crew) => (
                  <span>{crew.name}</span>
                ))}
              </p>
            </span>
          </div>
          <div className="flex flex-col items-center space-y-2 absolute right-0 top-10 mr-10 bg-[#171930] p-8">
            <img
              className="w-60 h-80 object-contain"
              src={`https://image.tmdb.org/t/p/original/${moviePoster}`}
              alt={movieData?.data?.title}
            />
            <CircularProgress percentage={progressRating} />
            <h4 className="font-bold">{movieData?.data?.title}</h4>
            <div className="flex gap-1">
              {movieData?.data?.genres.map((genre, index, array) => (
                <div key={genre.id}>
                  <p>
                    {genre.name}
                    <span>{index !== array.length - 1 && ","}</span>
                  </p>
                </div>
              ))}
            </div>
            <p className="flex self-start justify-self-end">
              {movieData?.data?.runtime} mins
            </p>
          </div>
        </div>
      </div>
      <section className="p-10">
        {/* <div className="flex flex-col py-20">
          <div className="flex font-bold uppercase space-x-16">
            <h1 className="w-4/12">Cast</h1>
            <h1>Photo Gallery</h1>
          </div>
          <div className="w-full h-1 bg-gradient-to-r from-[#262f66] to-[#0c1124] rounded-lg shadow-lg flex my-2" />
          <div className="flex space-x-64 pt-4">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-4">
                {movieData?.credits?.cast.slice(0, 9).map((crew) => (
                  <div
                    className="flex space-x-10 items-center uppercase"
                    key={crew.id}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original/${crew.profile_path}`}
                      className="w-28 h-28 rounded-full object-cover"
                      alt=""
                    />
                    <p>{crew.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-3/5 justify-end">
              <EmblaCarousel
                images={gallery}
                slides={SLIDES}
                options={OPTIONS}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h1>More Like This</h1>
          <div className="w-full h-1 bg-gradient-to-r from-[#262f66] to-[#0c1124] rounded-lg shadow-lg flex my-2" />
          <div className="grid grid-cols-4 gap-4" id="newMovies">
            {Array.isArray(movieData?.recommendations) &&
              movieData?.recommendations?.slice(0, 4).map((movie) => (
                <div key={movie.id}>
                  <MovieRecBox
                    id={movie.id}
                    title={movie.title}
                    rating={movie.vote_average}
                    image={movie.poster_path}
                    overview={movie.overview}
                  />
                </div>
              ))}
          </div>
        </div> */}
      </section>
    </section>
  );
}
