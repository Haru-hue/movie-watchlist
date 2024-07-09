import { Metadata } from "next";
import { ReactNode } from "react";

type Props = {
  params: { id: string };
  children: ReactNode;
};

export async function generateMetadata(
  { params }: Props): Promise<Metadata> {
  return {
    title: `Profile - The Movie Watch List`,
  };
}

export default function ProfileLayout({
  children,
}: Props) {
  return <div>{children}</div>;
}
