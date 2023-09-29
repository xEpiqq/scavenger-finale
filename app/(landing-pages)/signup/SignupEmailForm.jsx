"use client";

// import use state
import { useState } from "react";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { app, db } from "../../../components/initializeFirebase";

function SignupEmailForm() {
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.push("/freetrial");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/email-already-in-use") {
          alert("Email already in use");
          return;
        }
        if (errorCode === "auth/invalid-email") {
          alert("Invalid email");
          return;
        }
        if (errorCode === "auth/weak-password") {
          alert("Weak password");
          return;
        }
        console.log(error);
        // ..
      });
  };

  return (
    <>
      <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="text-gray-900 block text-sm font-medium leading-6"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              autoComplete="email"
              required
              className="text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="text-gray-900 block text-sm font-medium leading-6"
          >
            Password
          </label>
          <div className="mt-2">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="text-gray-900 block text-sm font-medium leading-6"
          >
            Confirm your Password
          </label>
          <div className="mt-2">
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="border-gray-300 text-indigo-600 focus:ring-indigo-600 h-4 w-4 rounded"
            />
            <label
              htmlFor="remember-me"
              className="text-gray-900 ml-3 block text-sm leading-6"
            >
              Remember me
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="hover:bg-indigo-500 focus-visible:outline-indigo-600 flex w-full justify-center rounded-md bg-gray-1 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Sign up
          </button>
        </div>
      </form>
    </>
  );
}

export default SignupEmailForm;
