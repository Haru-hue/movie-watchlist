"use client";
import { FormErrorMessage } from "@/components/common/ErrorMessage";
import { Loader } from "@/components/common/Loader";
import { LayoutView } from "@/components/layouts";
import { REGISTER_USER } from "@/constants/queries";
import { signupSchema, signupValues } from "@/lib/schema";
import {
  createImageFromInitials,
  getRandomColor,
} from "@/utils/createImageInitial";
import { useMutation } from "@apollo/client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Field, FormikProvider, useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: signupValues,
    validationSchema: signupSchema,
    onSubmit: (values) => {
      registerUser({
        variables: {
          ...values,
          avatarURL: createImageFromInitials(
            500,
            values.name,
            getRandomColor()
          ),
        },
      });
    },
    validateOnMount: true,
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: (res) => {
      const userInfo = { ...res.addUser.user };
      toast.success(res.addUser.message);
      localStorage.setItem("userToken", res.addUser.token);
      localStorage.setItem("localUser", JSON.stringify(userInfo));
      formik.resetForm();
      setTimeout(() => {
        router.push("/");
      }, 2000);
    },
    onError: (error) => {
      toast.error(`${error?.message}`);
    },
  });

  return (
    <section className="flex items-center justify-center h-screen movieBG">
      <Toaster position="top-right" containerClassName="font-bold bg-red" />
      <div className="flex flex-col rounded-sm border border-stroke w-full mx-4 max-w-2xl bg-secondary">
        <div className="w-full p-6">
          <h2 className="mb-9 text-2xl font-bold">Create an account</h2>
          <FormikProvider value={formik}>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Enter your name
              </label>
              <div className="relative">
                <Field
                  name="name"
                  type="text"
                  placeholder="i.e James Bond (Your first name and last name)"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  autoComplete="off"
                  autoSave="off"
                />
                <FormErrorMessage name="name" />
                <span className="absolute right-4 top-4">
                  <Icon icon="ph:user" fontSize={22} />
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Enter your username
              </label>
              <div className="relative">
                <Field
                  name="username"
                  type="text"
                  placeholder="i.e James Bond (Your first name and last name)"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  autoComplete="off"
                  autoSave="off"
                />
                <FormErrorMessage name="username" />
                <span className="absolute right-4 top-4">
                  <Icon icon="ph:user" fontSize={22} />
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Enter your e-mail
              </label>
              <div className="relative">
                <Field
                  name="email"
                  type="email"
                  placeholder="i.e abc@gmail.com"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  autoComplete="disabled"
                  autocomplete="new-password"
                  data-aviraignore
                />
                <FormErrorMessage name="email" />
                <span className="absolute right-4 top-4">
                  <Icon icon="ph:user" fontSize={22} />
                </span>
              </div>
            </div>
            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Password
              </label>
              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="6+ Characters, 1 Capital letter"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  autoComplete="disabled"
                  autocomplete="new-password"
                />
                <FormErrorMessage name="password" />
                <span
                  className="absolute right-4 top-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    icon={
                      !showPassword
                        ? "weui:eyes-off-outlined"
                        : "weui:eyes-on-outlined"
                    }
                    fontSize={22}
                  />
                </span>
              </div>
            </div>
            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Confirm Password
              </label>
              <div className="relative">
                <Field
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="6+ Characters, 1 Capital letter"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  autoComplete="disabled"
                  autocomplete="new-password"
                />
                <FormErrorMessage name="confirmPassword" />
                <span
                  className="absolute right-4 top-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    icon={
                      !showPassword
                        ? "weui:eyes-off-outlined"
                        : "weui:eyes-on-outlined"
                    }
                    fontSize={22}
                  />
                </span>
              </div>
            </div>
          </FormikProvider>
          <div className="mb-5">
            <button
              className="w-full cursor-pointer rounded-lg border border-primary bg-slate-700 disabled:bg-slate-800 disabled:cursor-not-allowed p-4 text-white transition hover:bg-opacity-90 justify-center flex"
              disabled={!formik.isValid}
              onClick={() => formik.handleSubmit()}
            >
              {loading ? <Loader size={25} /> : "Register"}
            </button>
          </div>
          <div className="mt-6 text-center">
            <p>
              Already have an account?{" "}
              <Link href="/auth/login" className="text-violet-500">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;