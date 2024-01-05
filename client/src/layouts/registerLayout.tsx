"use client"
import { useAppDispatch } from "@/hooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { setTestProfile } from "@/features/userProfile";

export function SignUpForm() {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  type formDetails = 'name' | 'email' | 'password' | 'confirmPassword'

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, name: formDetails) => {
    setUserDetails((prev) => {
      return {
        ...prev,
        [name]: event.target.value
      }
    })
  }

  console.log(userDetails)

  return (
    <div className="flex w-[50vw] text-black">
      <div className="bg-white p-10 rounded-lg shadow-md w-1/2">
        <h2 className="text-2xl font-bold">Sign Up</h2>
        <p>Create an account to continue</p>
        <form className="flex flex-col gap-10 pt-6">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              type="text"
              value={userDetails.name}
              onChange={(e) => handleChange(e, 'name')}
            />
          </div>
          <div>
            <label className="block text-gray-700">Email Address</label>
            <input
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              type="email"
              value={userDetails.email}
              onChange={(e) => handleChange(e, 'email')}
            />
          </div>
          <div className="flex justify-between">
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                type="password"
                value={userDetails.password}
                onChange={(e) => handleChange(e, 'password')}
              />
            </div>
            <div>
              <label className="block text-gray-700">Confirm Password</label>
              <input
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                type="password"
                value={userDetails.confirmPassword}
                onChange={(e) => handleChange(e, 'confirmPassword')}
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
        <button className="w-full py-2 px-4 border border-black rounded-md mt-4">
          <div className="flex items-center justify-center gap-4">
            <Icon icon="flat-color-icons:google" className="text-3xl" />
            <p className="font-semibold">Sign Up with Google</p>
          </div>
        </button>
      </div>
      <div className="movieBG bg-contain w-1/2"></div>
    </div>
  );
}

export function LoginForm() {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  })
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, name: 'email' | 'password') => {
    setUserDetails((prev) => {
      return {
        ...prev,
        [name]: event.target.value
      }
    })
  }

  const isFilled = useMemo(() => {
    return userDetails.email !== '' && userDetails.password !== ''
  }, [userDetails])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setTestProfile(userDetails.email))
    router.push('/profile')
  }

  return (
    <div className="flex w-[50vw] text-black">
      <div className="bg-white p-10 rounded-lg shadow-md w-1/2">
        <h2 className="text-2xl font-bold">Log In</h2>
        <p>Log in to your account</p>
        <form className="flex flex-col gap-10 pt-6">
          <div>
            <label className="block text-gray-700">Email Address</label>
            <input
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              type="email"
              onChange={(event) => handleChange(event, 'email')}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              type="password"
              onChange={(event) => handleChange(event, 'password')}
            />
          </div>
          <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md mt-4"
            disabled={!isFilled}
            onClick={(e) => handleSubmit(e)}
          >
            Log In
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <a className="text-blue-600" href="#">
            Sign up
          </a>
        </p>
        <div className="flex items-center py-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button className="w-full py-2 px-4 border border-black rounded-md mt-4">
          <div className="flex items-center justify-center gap-4">
            <Icon icon="flat-color-icons:google" className="text-3xl" />
            <p className="font-semibold">Log in with Google</p>
          </div>
        </button>
      </div>
      <div className="movieBG bg-contain w-1/2"></div>
    </div>
  );
}
