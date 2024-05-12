import Spinner from "@/components/Spinner";
import { useNavigationTracker } from "@/hooks/useRouteHistory";
import PageLayout from "@/layouts/movieLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function MoviePage() {
  const [movieId, setMovieId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useNavigationTracker()
  
  useEffect(() => {
    if (router.isReady) {
      setIsLoading(true);
      if (router.query.movieId) {
        setMovieId(Number(router.query.movieId));
        setIsLoading(false);
      }
    }
  }, [router.isReady, router.query]);

  return isLoading ? (
    <Spinner/>
  ) : (
    movieId !== null && <PageLayout movieId={movieId} />
  );
}

export default MoviePage;
