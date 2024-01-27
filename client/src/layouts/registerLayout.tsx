"use client";
import { useAppDispatch } from "@/hooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
// import { setTestProfile } from "@/features/userProfile";
import { FormPage, Username, VerificationPage } from "@/components/register";
import ScrollToTop from "@/utils/scrollToTop";

export function SignUpForm() {
  const [step, setStep] = useState<number>(0);
  let subPages = [];

  const handleProgress = (value: number) => {
    setStep(value);
  };

  useEffect(() => {
    ScrollToTop();
  }, [step]);

  subPages = [
    <FormPage key={0} handleProgress={handleProgress} />,
    <VerificationPage key={1} handleProgress={handleProgress} />,
    <Username key={2} />,
  ];

  return (
    <div className="flex w-[50vw] movieBG rounded-3xl bg-contain justify-center">
      {subPages[step]}
    </div>
  );
}

export function LoginForm() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: "email" | "password"
  ) => {
    setUserDetails((prev) => {
      return {
        ...prev,
        [name]: event.target.value,
      };
    });
  };

  const isFilled = useMemo(() => {
    return userDetails.email !== "" && userDetails.password !== "";
  }, [userDetails]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // dispatch(setTestProfile(userDetails.email));
    router.push("/profile");
  };

  return (
    <div className="flex w-[50vw] movieBG rounded-3xl bg-contain justify-center">
      <div className="p-10 rounded-3xl bg-[#1D2939] shadow-md w-1/2">
        <h2 className="text-2xl font-bold">Log In</h2>
        <p>Log in to your account</p>
        <form className="flex flex-col gap-6 pt-6">
          <div>
            <label className="text-gray-400">Email Address</label>
            <input
              className="p-1 w-full border-b-[1px] bg-transparent"
              type="email"
              onChange={(event) => handleChange(event, "email")}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              className="p-1 w-full border-b-[1px] bg-transparent"
              type="password"
              onChange={(event) => handleChange(event, "password")}
            />
          </div>
          <button
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-md mt-4"
            disabled={!isFilled}
            onClick={(e) => handleSubmit(e)}
          >
            Log In
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <a className="text-blue-600" href="/register">
            Sign up
          </a>
        </p>
        <div className="flex items-center py-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button className="w-full py-3 px-4 bg-white rounded-md mt-4 text-black">
          <div className="flex items-center justify-center gap-4">
            <Icon icon="flat-color-icons:google" className="text-3xl" />
            <p>Log in with Google</p>
          </div>
        </button>
      </div>
      <div className="w-1/2"></div>
    </div>
  );
}
