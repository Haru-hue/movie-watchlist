import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React from "react";
import movieBG from "@/assets/movieBG.jpg";

function SignUpForm() {
  return (
    <div className="flex w-[50vw] text-black">
      <div className="flex-1 bg-white px-6 rounded-lg shadow-md w-1/3">
        <h2 className="text-2xl font-bold">Sign Up</h2>
        <p>Create an account to continue</p>
        <form className="flex flex-col gap-10 pt-6">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              type="text"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email Address</label>
            <input
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              type="email"
            />
          </div>
          <div className="flex justify-between">
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                type="password"
              />
            </div>
            <div>
              <label className="block text-gray-700">Confirm Password</label>
              <input
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                type="password"
              />
            </div>
          </div>
          <div>
            <input className="mr-2" type="checkbox" />
            <label className="text-gray-700">
              I agree to the Terms and Conditions
            </label>
          </div>
          <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md mt-4">
            Sign Up
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <a className="text-blue-600" href="#">
            Sign In
          </a>
        </p>
        <div className="flex items-center py-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md mt-4">
            Sign Up
          </button>
      </div>
      <div className="flex-1 movieBG bg-contain">h</div>
    </div>
  );
}

export default SignUpForm;
