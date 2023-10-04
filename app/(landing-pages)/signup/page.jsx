/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import { doc, getDoc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, db } from "../../../components/initializeFirebase";
import GoogleLogin from "@/components/GoogleLogin";
import SignupEmailForm from "./SignupEmailForm";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
const provider = new GoogleAuthProvider();

export default function Example() {
  

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 mt-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-gray-300 mt-6 text-center text-2xl leading-9 tracking-tight">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <div>


          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-white px-6 text-gray-900">Sign up with google</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4">
                <GoogleLogin />
          </div>

          <div className="relative mt-10">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-white px-6 text-gray-900">Or email</span>
            </div>
          </div>

              <div className="relative mt-10">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                </div>
              </div>

            <SignupEmailForm />

            </div>
          </div>

          <p className="text-gray-200 mt-10 text-center text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 hover:text-indigo-500 font-semibold leading-6"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
