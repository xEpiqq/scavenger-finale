"use client";
import { useState, useEffect } from "react";
import GoogleLogin from "../GoogleLogin";
import EmailLogin from "../EmailLogin";

function SignupModal(props) {
  const { setSignup } = props;

  const [googleBtn, setGoogleBtn] = useState("Signup");

  const handleEscape = (e) => {
    if (e.key === "Escape") {
      setSignup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center ">
        <div
          className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-80 "
          onClick={() => {
            setSignup(false);
          }}
        />

        <div className="relative z-30 w-11/12 rounded-lg border border-white bg-pbblack2 p-8 py-20 pt-20 text-white shadow-lg max-w-sm">
          <div
            className="border-px absolute right-0 top-0 mr-4 mt-4 cursor-pointer rounded-md border border-yellow px-2 opacity-60 transition-all duration-150 hover:opacity-100"
            onClick={() => {
              setSignup(false);
            }}
          >
            esc
          </div>

          <h2 className="mb-4 text-2xl font-bold">
            Signup to try Scavenger for free now!
          </h2>
          {/* <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-primary hover:bg-black/30 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form> */}
          <div className="mt-4">
            <p className="text-sm">
              {/* Signup with google to get early access to Scavenger. */}
            </p>
            <div className="-mb-3 mt-8">
              <EmailLogin method={googleBtn} />
            </div>
            <div className="-mb-3 mt-8">
              <GoogleLogin method={googleBtn} />
            </div>

            {googleBtn === "Signup" ? (
              <p className="text-sm">
                Already have an account?{" "}
                <a
                  className="cursor-pointer font-semibold text-primary"
                  onClick={() => setGoogleBtn("Login")}
                >
                  Log in
                </a>
              </p>
            ) : (
              <p className="text-sm">
                Don't have an account?{" "}
                <a
                  className="cursor-pointer font-semibold text-primary"
                  onClick={() => setGoogleBtn("Signup")}
                >
                  Sign up
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupModal;
