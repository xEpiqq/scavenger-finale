'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from '../../components/initializeFirebase'
import GoogleLogin from "@/components/GoogleLogin";
import { getAuth } from "firebase/auth";
import SignupModal from '../../components/Signupmodal/signupmodal'

const db = getFirestore(app);
const auth = getAuth();

const Hero = () => {

  const [signup, setSignup] = useState(false);

  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px] mt-4 sm:mt-6 md:mt-4 lg:-mt-4"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mx-auto max-w-[800px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-5 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white dark:text-white sm:leading-tight md:leading-tight">
                Find Leads. <span className="text-primary text-stroke text-stroke-black" >Sell</span> Websites
                </h1>
                <p className="mb-12 text-lg sm:text-xl md:text-2xl font-extralight !leading-relaxed text-pbsecondbg ">
                  Scavenger generates highly targeted leads with tons of website data.<span className="font-semibold"></span>
                </p>


                <div className="relative mx-auto md:mx-0 w-full aspect-video"><iframe src="https://player.vimeo.com/video/831300665?h=f6e885212b&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" allow="autoplay; fullscreen; picture-in-picture" className="w-full h-full"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>


                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="bg-pbblack p-10 flex items-center justify-center sm:flex-row gap-8 rounded-md mt-16">
                  
                  <div>
                  No committments. Cancel anytime - <span className="font-semibold">100% risk free.</span>

                  </div>
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
          <SignupModal setSignup={setSignup}/>
        )}


    </>
  );
};

export default Hero;
