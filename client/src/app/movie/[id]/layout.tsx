import { getMovieDetails } from "@/apis/movie";
import { Metadata } from "next";
import { ReactNode } from "react";

type Props = {
  params: { id: string };
  children: ReactNode;
};

export async function generateMetadata(
  { params }: Props): Promise<Metadata> {
  const movie = await getMovieDetails(parseInt(params.id));
  return {
    title: `${movie.title} - The Movie Watch List`,
  };
}

export default function ProfileLayout({
  children,
}: Props) {
  return <div>{children}</div>;
}
