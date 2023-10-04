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
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 mt-24">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-gray-300 mt-6 text-center text-2xl leading-9 tracking-tight">
            Reset your password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <h2 className="text-gray-400 mt-6 text-center text-2xl leading-9 tracking-tight">
                Enter your email address
              </h2>
              <div>
                <label
                  htmlFor="email"
                  className="text-gray-300 block text-sm font-medium leading-6"
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
                    className="text-gray-900 placeholder:text-gray-300 border block w-full rounded-md py-1.5 shadow-sm sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className=" hover:bg-gray-800 duration-150 flex w-full justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-2"
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
