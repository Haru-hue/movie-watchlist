import RegisterForm from "@/page.components/auth/registerForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a New Account - The Movie Watch List",
  description: "Powered by TMDB API",
};

const RegisterScreen = () => {
  return <RegisterForm/>
};

export default RegisterScreen;