import PageLayout from "@/layouts/pageLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function MoviePage() {
  const [movieId, setMovieId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.movieId) {
      setMovieId(Number(router.query.movieId));
    }
  }, [router.query]);

  return movieId !== null ? <PageLayout movieId={movieId} /> : null;
}

export default MoviePage;
