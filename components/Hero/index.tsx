"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../../components/initializeFirebase";
import GoogleLogin from "@/components/GoogleLogin";
import { getAuth } from "firebase/auth";
import SignupModal from "../../components/Signupmodal/signupmodal";

const db = getFirestore(app);
const auth = getAuth();

const Hero = () => {
  const [signup, setSignup] = useState(false);

  return (
    <>
      <section
        id="home"
        className="relative z-10 mt-4 overflow-hidden pb-16 pt-[120px] sm:mt-6 md:mt-4 md:pb-[120px] md:pt-[150px] lg:-mt-4 xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mx-auto max-w-[800px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-5 text-4xl font-bold leading-tight text-white dark:text-white sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight">
                  Find Leads.{" "}
                  <span className="text-stroke text-stroke-black text-primary">
                    Sell
                  </span>{" "}
                  Websites
                </h1>
                <p className="mb-12 text-lg font-extralight !leading-relaxed text-pbsecondbg sm:text-xl md:text-2xl ">
                  Scavenger generates highly targeted leads with tons of website
                  data.<span className="font-semibold"></span>
                </p>

                <div className="relative mx-auto aspect-video w-full md:mx-0">
                  <iframe
                    src="https://player.vimeo.com/video/831300665?h=f6e885212b&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                    allow="autoplay; fullscreen; picture-in-picture"
                    className="h-full w-full"
                  ></iframe>
                </div>
                <script src="https://player.vimeo.com/api/player.js"></script>

                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 mt-3">

                  <div className="mt-3 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
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

      {signup && <SignupModal setSignup={setSignup} />}
    </>
  );
};

export default Hero;
