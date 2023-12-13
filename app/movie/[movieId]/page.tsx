"use client";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import EmblaCarousel from "@/app/components/gallery";
import { EmblaOptionsType } from "embla-carousel-react";
import getMovieDetails from "@/app/lib/getMovieDetails";
import { MovieBox, MovieRecBox } from "@/app/components/movieBox";

type Params = {
  params: {
    movieId: number;
  };
};

function MoviePage({ params: { movieId } }: Params) {
  const [movieData, setMovieData] = useState<MovieData>({
    recommendations: [],
  });

  useEffect(() => {
    const fetchNewMovies = async () => {
      const [data, credits, gallery, recommendations] = await Promise.all([
        getMovieDetails(movieId),
        getMovieDetails(movieId, "credits"),
        getMovieDetails(movieId, "images"),
        getMovieDetails(movieId, "recommendations"),
      ]);

      setMovieData((prev) => ({
        ...prev,
        data: data,
        credits: credits,
        gallery: gallery,
        recommendations: recommendations?.results,
      }));
    };
    fetchNewMovies();
  }, []);

  const date = movieData?.data?.release_date;
  const releaseDate = dayjs(date).format("D MMM YYYY");
  const director = movieData?.credits?.crew.filter(
    (crew) => crew.job === "Director"
  );

  const gallery: string[] = (movieData?.gallery?.backdrops || [])
    .slice(1, 6)
    .map((image) => `https://image.tmdb.org/t/p/original/${image.file_path}`);

  const OPTIONS: EmblaOptionsType = {};
  const SLIDE_COUNT = gallery.length;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <section>
      <div className="movieBanner"></div>
      <div className="flex justify-between p-6">
        <div className="flex flex-col space-y-2">
          <h4 className="font-bold">{movieData?.data?.title}</h4>
          <div className="flex">
            {movieData?.data?.genres.map((genre) => (
              <div key={genre.id}>
                <p>{genre.name}</p>
              </div>
            ))}
          </div>
          <p>{movieData?.data?.runtime} mins</p>
        </div>
        <div className="flex space-x-2 font-bold">
          <p>TMDB</p>
          <p>{movieData?.data?.vote_average.toFixed(1)}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex font-bold">
          <h1 className="uppercase w-5/12">Details</h1>
          <h1 className="uppercase">Storyline</h1>
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-[#262f66] to-[#0c1124] rounded-lg shadow-lg flex my-2" />
        <div className="flex space-x-20 2xl:space-x-36">
          <div className="flex flex-col space-y-4 w-4/12">
            <div className="flex justify-between font-bold uppercase space-x-1/4">
              <h3>country</h3>
              {movieData?.data?.production_countries?.map((country) => (
                <h3 key={country.id}>{country.name}</h3>
              ))}
            </div>
            <div className="flex justify-between font-bold uppercase space-x-1/4">
              <h3>language</h3>
              <p className="flex space-x-3">
                {movieData?.data?.spoken_languages?.map((lang) => (
                  <h3 key={lang.iso_639_1}>{lang.english_name}</h3>
                ))}
              </p>
            </div>
            <div className="flex justify-between font-bold uppercase space-x-1/4">
              <h3>release date</h3>
              <p>{releaseDate}</p>
            </div>
            <div className="flex justify-between font-bold uppercase space-x-1/4">
              <h3>director</h3>
              <p>
                {director?.map((crew) => (
                  <span>{crew.name}</span>
                ))}
              </p>
            </div>
          </div>
          <div className="w-1/2">{movieData?.data?.overview}</div>
        </div>
      </div>
      <div className="flex flex-col py-20">
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
            <EmblaCarousel images={gallery} slides={SLIDES} options={OPTIONS} />
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
      </div>
    </section>
  );
}

export default MoviePage;
