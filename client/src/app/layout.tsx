import { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "./providers";
import { RouteChangeListener } from "@/utils/routeChanger";

export const metadata: Metadata = {
  title: "Home - The Movie Watch List",
  description: "Powered by TMDB API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RouteChangeListener />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}