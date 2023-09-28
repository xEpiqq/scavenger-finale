"use client";
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { app, db } from "../../../components/initializeFirebase";

function Page() {
  const auth = getAuth(app);

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/invalid-email") {
          alert("Invalid email");
          return;
        }
        if (errorCode === "auth/user-not-found") {
          alert("User not found");
          return;
        }
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="text-gray-900 mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <h2 className="text-gray-900 mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
                Type in your email address to reset your password
              </h2>
              <div>
                <label
                  htmlFor="email"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600 flex w-full justify-center rounded-md bg-gray-1 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Send password reset email
                </button>
              </div>
            </form>
          </div>

          <p className="text-gray-500 mt-10 text-center text-sm">

            <a
              href="/login"
              className="text-indigo-600 hover:text-indigo-500 font-semibold leading-6"
            >
                          Return to login{" "}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Page;
