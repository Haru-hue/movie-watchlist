import GettingStarted from "@/page.components/auth/gettingStarted";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in to your Account - The Movie Watch List",
  description: "Powered by TMDB API",
};

export const LoginScreen = () => {
  return <GettingStarted />;
};

export default LoginScreen;