import { getMovieDetails } from "@/apis/movie";
import { Metadata } from "next";
import { ReactNode } from "react";

type Props = {
  params: { id: string };
  children: ReactNode;
};

export async function generateMetadata(
  { params }: Props): Promise<Metadata> {
    const movie = await getMovieDetails(params.id);
    if (!movie) {
        // Handle the case when movie is undefined (e.g., show a default title)
        return {
            title: 'Movie Details - The Movie Watch List',
        };
    }
    return {
        title: `${movie.title} - The Movie Watch List`,
    };
}

export default function MovieLayout({
  children,
}: Props) {
  
  return <div>{children}</div>;
}
