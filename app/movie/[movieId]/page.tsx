import PageLayout from "@/app/layouts/pageLayout";

type Params = {
  params: {
    movieId: number;
  };
};

function MoviePage({ params: { movieId } }: Params) {
  return (
    <PageLayout movieId={movieId}/>
  );
}

export default MoviePage;
