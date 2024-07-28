"use client";
import { FormErrorMessage } from "@/components/common/ErrorMessage";
import { Loader } from "@/components/common/Loader";
import { LOGIN_USER } from "@/constants/queries";
import { loginSchema, loginValues } from "@/lib/schema";
import { useMutation } from "@apollo/client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Field, FormikProvider, useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const GettingStarted = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: loginValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      authenticateUser({ variables: values });
    },
    validateOnMount: true,
  });

  const [authenticateUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (res) => {
      const userInfo = { ...res.login.user };
      toast.success(res.login.message);
      localStorage.setItem("userToken", res.login.token);
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
      <Toaster position="top-right" containerClassName="font-bold" />
      <div className="flex flex-col rounded-sm border border-stroke w-full mx-4 max-w-2xl bg-secondary">
        <div className="w-full p-6">
          <h2 className="mb-9 text-2xl font-bold">Sign in to your account</h2>
          <FormikProvider value={formik}>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Enter your e-mail
              </label>
              <div className="relative">
                <Field
                  name="email"
                  type="email"
                  placeholder="i.e abc@example.com"
                  className="w-full rounded-lg border border-stroke bg-transparent p-4 bg-slate-700 outline-none focus:border-primary focus-visible:shadow-none"
                  autoComplete="off"
                  autoSave="off"
                />
                <FormErrorMessage name="email" />
                <span className="absolute right-4 top-4">
                  <Icon icon="ph:user" fontSize={22} />
                </span>
              </div>
            </div>
            <div className="mb-6">
              <label className="mb-2.5 block font-medium">Password</label>
              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="6+ Characters, 1 Capital letter"
                  className="w-full rounded-lg border border-stroke bg-transparent p-4 outline-none focus:border-primary focus-visible:shadow-none"
                  autoComplete="off"
                />
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
              {loading ? <Loader size={25} /> : "Sign in"}
            </button>
          </div>
          <div className="mt-6 text-center">
            <p>
              Don&apos;t have any account?{" "}
              <Link href="/auth/register" className="text-violet-500">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GettingStarted;