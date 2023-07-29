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
        className="relative z-10 mt-4 overflow-hidden pb-16 pt-[120px] sm:mt-6 md:mt-4 md:pb-[20px] md:pt-[150px] lg:-mt-4 xl:pb-[60px] xl:pt-[180px] 2xl:pb-[100px] 2xl:pt-[140px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mx-auto max-w-[800px] text-center"
                data-wow-delay=".2s"
              >
                <p className="font-extralight italic !leading-relaxed text-pbsecondbg sm:text-xl md:text-2xl ">
                  Struggling to get a constant flow of clients?
                  <span className="font-semibold"></span>
                </p>
                <h1 className="mb-2 text-4xl font-bold leading-tight text-white sm:text-5xl sm:leading-tight md:mb-5 md:text-6xl md:leading-tight lg:text-7xl">
                  SMMA{" "}
                  <span className="text-stroke text-stroke-black text-primary">
                    Owners,
                  </span>{" "}
                </h1>

                <p className="mb-8 text-lg font-light !leading-relaxed text-pbsecondbg sm:text-xl md:text-2xl ">
                  Use the Scavenger Cold Outreach Machine to get your first
                  client within 28 days... or{" "}
                  <span className="font-bold">FULL REFUND</span>, no questions
                  asked.
                  <span className="font-semibold"></span>
                </p>

                <div className="flex flex-col-reverse md:flex-col">
                  <div className="mt-12 flex w-full flex-col items-center justify-center md:mt-0">
                    <button
                      onClick={() => setSignup(true)}
                      className="flex items-center gap-3 rounded-md border-2 border-white bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg duration-300 ease-in-out hover:bg-black/30 sm:text-xl md:text-xl lg:text-xl xl:text-2xl"
                    >
                      Start Your Free Trial Today
                      <img
                        className="w-4"
                        src="/clicktrial.svg"
                        alt="start trial"
                      />
                    </button>
                    <p className="mt-2 text-sm text-pblines">
                      No Contracts • Cancel Anytime
                    </p>
                  </div>

                  <div className="-mt-16 flex flex-col items-center justify-center sm:-mt-14 md:mt-1 xl:w-full">
                    <div className="m-4 w-full">
                      <div className="mt-14 flex h-8 w-full items-center justify-center gap-2 bg-black text-white md:h-10">
                        <img
                          className="mt-2 h-4 w-4 md:mt-3"
                          src="/vidtinybutton.svg"
                          alt="tiny video button"
                        />{" "}
                        <p className="mt-2 text-[8px] font-semibold sm:text-sm md:mt-3 md:text-base">
                          Discover How In The Video Below
                        </p>
                      </div>
                      <div className="relative aspect-video w-full bg-black">
                        <iframe
                          src="https://player.vimeo.com/video/831300665?h=f6e885212b&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                          allow="autoplay; fullscreen; picture-in-picture"
                          className="h-full w-full"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <div className="mt-3 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="flex items-center justify-center gap-4 sm:flex-row"></div>
                  </div>
                </div>

                <div className="mt-3 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <div className="mt-3 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="flex items-center justify-center gap-4 sm:flex-row"></div>
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
