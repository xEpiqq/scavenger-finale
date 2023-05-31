"use client";
import Link from "next/link";
import { useState } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../../components/initializeFirebase";

const db = getFirestore(app);

const Hero = () => {
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    // handle signup logic here
  };

  const handleGoogleLogin = async () => {
    // handle Google login logic here
  };

  return (
    <>
      <section
        id="home"
        className="relative z-10 -mt-10 overflow-hidden pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mx-auto max-w-[800px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-5 text-4xl font-bold leading-tight text-white dark:text-white sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight">
                  Find Clients.{" "}
                  <span className="text-stroke text-stroke-black text-primary">
                    Sell
                  </span>{" "}
                  Websites
                </h1>
                <p className="mb-12 text-lg font-extralight !leading-relaxed text-pbsecondbg sm:text-xl md:text-2xl ">
                  Scavenger generates highly targeted leads with tons of website
                  data. <span className="font-semibold"></span>
                </p>

                <div className="relative mx-auto aspect-video w-full md:mx-0">
                  <iframe
                    className="h-full w-full"
                    src="https://player.vimeo.com/video/831300665"
                    frameBorder="0"
                    webkitallowfullscreen=""
                    mozallowfullscreen=""
                    allowFullScreen=""
                  ></iframe>
                </div>

                <div className="flex flex-col items-center justify-center space-y-4 mt-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <div className="flex items-center justify-center gap-4 sm:flex-row">
                    <button
                      onClick={() => setSignup(true)}
                      className="rounded-md border-2 border-white bg-primary px-4 py-3 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/30 dark:bg-black dark:text-white
                    dark:hover:bg-white/30 sm:text-xl md:text-xl lg:text-xl"
                    >
                      Start Your Free Trial Today
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="absolute bottom-0 right-0 z-[-1] opacity-100 lg:opacity-100"> */}
        {/* drop the forest_svg image at the bottom of the header */}
        {/* <img src="/images/hero/forest_svg.svg" alt="forest" className="w-full h-full bg-gradient-to-b from-primary to-black/30" />
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100"> */}

        {/* all the things */}
        {/* </div> */}

        <div className="absolute bottom-0 left-0 right-0 z-[-1]">
          <img src="/images/video/shape.svg" alt="shape" className="w-full" />
        </div>
      </section>

      {signup && (
        <div className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center ">
          <div
            className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-80 "
            onClick={() => {
              setSignup(false);
            }}
          />

          <div className="z-30 rounded-lg bg-white p-12 text-pbblack">
            <h2 className="mb-4 text-2xl font-bold">Sign Up</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label
                  className="text-gray-700 mb-2 block font-bold"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="text-gray-700 focus:shadow-outline rounded-lg border px-3 py-2 leading-tight focus:outline-none"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="text-gray-700 mb-2 block font-bold"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="text-gray-700 focus:shadow-outline rounded-lg border px-3 py-2 leading-tight focus:outline-none"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="focus:shadow-outline rounded bg-primary px-4 py-2 font-bold text-white hover:bg-black/30 focus:outline-none"
                  type="submit"
                >
                  Sign Up
                </button>
                <button
                  className="hover:bg-gray-100 text-gray-800 focus:shadow-outline rounded bg-white px-4 py-2 font-bold focus:outline-none"
                  onClick={() => setSignup(false)}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
            <div className="mt-4">
              <button
                className="hover:bg-gray-100 text-gray-800 focus:shadow-outline rounded bg-white px-4 py-2 font-bold focus:outline-none"
                onClick={handleGoogleLogin}
                type="button"
              >
                Sign Up with Google
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
