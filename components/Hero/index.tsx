'use client'
import Link from "next/link";
import { useState } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from '../../components/initializeFirebase'

const db = getFirestore(app);

const Hero = () => {

  const [signup, setSignup] = useState(true);
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
        className="relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px] -mt-10"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mx-auto max-w-[800px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-5 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white dark:text-white sm:leading-tight md:leading-tight">
                Find Clients. <span className="text-primary text-stroke text-stroke-black" >Sell</span> Websites
                </h1>
                <p className="mb-12 text-lg sm:text-xl md:text-2xl font-extralight !leading-relaxed text-pbsecondbg ">
                  Scavenger generates highly targeted leads with tons of website data. <span className="font-semibold"></span>
                </p>

                <div className="relative mx-auto md:mx-0 w-full aspect-video"><iframe className="w-full h-full" src="https://player.vimeo.com/video/831300665" frameBorder="0" webkitallowfullscreen="" mozallowfullscreen="" allowFullScreen=""></iframe></div>


                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="flex items-center justify-center sm:flex-row gap-4">
                  <button onClick={() => setSignup(true)} className="rounded-md bg-primary py-3 px-4 font-semibold text-white duration-300 ease-in-out hover:bg-black/30 dark:bg-black border-white border-2 dark:text-white dark:hover:bg-white/30
                    text-base sm:text-xl md:text-xl lg:text-xl">
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
      </section>

      {signup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20 ">
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-20 " onClick={() => {setSignup(false)}} />

          <div className="bg-white rounded-lg p-12 z-30 text-pbblack">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSignup}>
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
                <button
                  className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setSignup(false)}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
            <div className="mt-4">
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
