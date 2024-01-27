import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation } from "@apollo/client";
import { REGISTER, UPDATE_USER, VERIFY_USER } from "@/utils";
import { createRef, useState } from "react";
import { sendEmail } from "@/utils/sendEmail";
import toast, { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setUserProfile } from "@/features/userProfile";
import { useRouter } from "next/router";
import { useGoogleLogin } from "@react-oauth/google";
import getGoogleUserDetails from "@/lib/getGoogleUserDetails";

interface registerFlow {
  handleProgress: (progress: number) => void;
}

export const FormPage = ({ handleProgress }: registerFlow) => {
  const dispatch = useAppDispatch();
  const [addUser] = useMutation(REGISTER, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      dispatch(setUserProfile(userDetails.email));
      const emailData: EmailParams = {
        to_name: userDetails.name,
        to_email: userDetails.email,
        message: data?.addUser?.verificationCode,
      };
      sendEmail(emailData);
      toast.success("A verification code has been sent to your e-mail", {
        duration: 5000,
      });
      setTimeout(() => handleProgress(1), 5000);
    },
    onError: (error) => {
      console.error(error);
      if (error.graphQLErrors) {
        error.graphQLErrors.map(({ message }: any) => {
          toast.error(message);
        });
      }
    },
  });
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerWithGoogle = useGoogleLogin({
    onSuccess: async (data) => {
      const userData = await getGoogleUserDetails(data);
      console.log(userData);
    },
    onError: (err) => console.log(err),
  });

  type formDetails = "name" | "email" | "password" | "confirmPassword";

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: formDetails
  ) => {
    setUserDetails((prev) => {
      return {
        ...prev,
        [name]: event.target.value,
      };
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addUser({
      variables: {
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password,
      },
    });
  };
  return (
    <>
      <Toaster />
      <div className="bg-[#1D2939] p-10 rounded-3xl shadow-md w-1/2">
        <h2 className="text-2xl font-bold">Sign Up</h2>
        <p>Create an account to continue</p>
        <form className="flex flex-col gap-10 pt-6">
          <div>
            <label className="block ">Full Name</label>
            <input
              className="p-1 w-full border-b-[1px] bg-transparent"
              type="text"
              value={userDetails.name}
              onChange={(e) => handleChange(e, "name")}
            />
          </div>
          <div>
            <label className="block ">Email Address</label>
            <input
              className="p-1 w-full border-b-[1px] bg-transparent"
              type="email"
              value={userDetails.email}
              onChange={(e) => handleChange(e, "email")}
            />
          </div>
          <div className="flex justify-between">
            <div>
              <label className="block ">Password</label>
              <input
                className="p-1 w-full border-b-[1px] bg-transparent"
                type="password"
                value={userDetails.password}
                onChange={(e) => handleChange(e, "password")}
              />
            </div>
            <div>
              <label className="block ">Confirm Password</label>
              <input
                className="p-1 w-full border-b-[1px] bg-transparent"
                type="password"
                value={userDetails.confirmPassword}
                onChange={(e) => handleChange(e, "confirmPassword")}
              />
            </div>
          </div>
        </form>
        <button
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-md mt-8"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
        <p className="mt-4">
          Already have an account?{" "}
          <a className="text-blue-600" href="/login">
            Sign In
          </a>
        </p>
        <div className="flex items-center py-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button
          className="w-full py-2 px-4 bg-white rounded-md mt-4 text-black"
          onClick={() => registerWithGoogle()}
        >
          <div className="flex items-center justify-center gap-4">
            <Icon icon="flat-color-icons:google" className="text-3xl" />
            <p>Sign Up with Google</p>
          </div>
        </button>
      </div>
      <div className="w-1/2"></div>
    </>
  );
};

export const VerificationPage = ({ handleProgress }: registerFlow) => {
  const email = useAppSelector((state) => state.users.email);
  const [verifyUser] = useMutation(VERIFY_USER, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      toast.success(data?.verifyUser?.message, { duration: 5000 });
      setTimeout(() => handleProgress(2), 5000);
    },
    onError: (error) => {
      console.error(error);
      if (error.graphQLErrors) {
        error.graphQLErrors.map(({ message }: any) => {
          toast.error(message);
        });
      }
    },
  });
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const inputRefs = Array(4)
    .fill(0)
    .map((_) => createRef<HTMLInputElement>());

  const handleInputChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value.length === 1 && !isNaN(Number(value))) {
        setVerificationCode((prevState) => {
          const newState = [...prevState];
          newState[index] = value;
          return newState;
        });

        if (index < 3) {
          inputRefs[index + 1].current?.focus();
        }
      }
    };

  const handleVerify = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const verificationNumber = parseInt(verificationCode.join(""));
    verifyUser({
      variables: {
        email,
        verificationCode: verificationNumber,
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center p-10 bg-[#1D2939] rounded-3xl gap-8 w-3/5">
      <Toaster />
      <span className="flex flex-col text-center pt-10 gap-2">
        <h2 className="text-3xl font-bold">Verification Code</h2>
        <p>Enter the code sent to your e-mail address</p>
      </span>
      <div className="flex justify-center items-center space-x-6 py-10">
        {verificationCode.map((code, index) => (
          <input
            key={index}
            type="text"
            value={code}
            onChange={handleInputChange(index)}
            className="border border-gray-400 bg-transparent rounded-xl h-24 w-[4.5rem] text-center text-5xl font-bold"
            maxLength={1}
            ref={inputRefs[index]}
          />
        ))}
      </div>
      <button
        className="bg-blue-600 w-full p-5 rounded-lg font-semibold"
        onClick={handleVerify}
      >
        Verify
      </button>
      <p className="mb-8">
        Didn't receive a code?{" "}
        <span className="font-bold cursor-pointer">Resend code</span>
      </p>
    </div>
  );
};

export const Username = () => {
  const email = useAppSelector((state) => state.users.email);
  const router = useRouter();
  const [updateUser] = useMutation(UPDATE_USER, {
    fetchPolicy: "no-cache",
    onCompleted: () => {
      toast.success("Success", { duration: 5000 });
      router.push("/profile");
    },
    onError: (error) => {
      console.error(error);
      if (error.graphQLErrors) {
        error.graphQLErrors.map(({ message }: any) => {
          toast.error(message);
        });
      }
    },
  });
  const [username, setUsername] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    updateUser({
      variables: {
        email,
        username,
      },
    });
  };

  return (
    <div className="bg-[#1D2939] justify-center p-10 rounded-lg w-1/2">
      <Toaster />
      <span className="flex flex-col text-center pt-8 gap-2">
        <h3 className="font-bold text-2xl">Enter a username</h3>
        <p>Your username is how friends can see your profile</p>
      </span>
      <div className="py-10">
        <label className="uppercase text-slate-400">Username</label>
        <input
          className="p-1 w-full border-b-[1px] bg-transparent"
          type="text"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button
        className="bg-blue-600 w-full p-4 rounded-lg mt-4"
        onClick={handleSubmit}
      >
        Continue
      </button>
    </div>
  );
};
