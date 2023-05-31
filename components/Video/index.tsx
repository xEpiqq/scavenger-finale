"use client";
import Link from "next/link";
import { useState } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from '../../components/initializeFirebase'
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import ModalVideo from "react-modal-video";

const db = getFirestore(app);

const Video = () => {
  const [isOpen, setOpen] = useState(false);
 
  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="BEHOLD THE DEMO..."
          paragraph=""
          center
          mb="80px"
        />

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp mx-auto max-w-[770px] overflow-hidden rounded-md"
              data-wow-delay=".15s"
            >
              <div className="relative aspect-[77/40] items-center justify-center">
                <Image src="/images/video/video.png" alt="video image" fill />
                <div className="absolute top-0 right-0 flex h-full w-full items-center justify-center">
                  <button
                    onClick={() => setOpen(true)}
                    className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white bg-opacity-75 text-primary transition hover:bg-opacity-100"
                  >
                    <svg
                      width="16"
                      height="18"
                      viewBox="0 0 16 18"
                      className="fill-current"
                    >
                      <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalVideo
        channel="youtube"
        autoplay={true}
        start={true}
        isOpen={isOpen}
        videoId="bfgf4QvKSzc"
        onClose={() => setOpen(false)}
      />

                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 m-16">
                <Link href="/signup">
                  <button className="rounded-md bg-primary py-3 px-4 font-semibold text-white duration-300 ease-in-out hover:bg-black/30 dark:bg-black border-white border-2 dark:text-white dark:hover:bg-white/30
                    text-base sm:text-xl md:text-xl lg:text-xl">
                      Start Your Free Trial Today
                    </button>
                </Link>
                </div> 

    </section>
  );
};

export default Video;
