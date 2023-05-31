'use client'
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";
import { useState } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from '../../components/initializeFirebase'
import Link from "next/link";
import SignupModal from '../../components/Signupmodal/signupmodal'


const db = getFirestore(app);

const Features = () => {

  const [signup, setSignup] = useState(false);



  return (
    <>
      {signup && (
        <SignupModal setSignup={setSignup}/>
      )}
      <section
        id="features"
        className="bg-primary/[.03] py-16 md:py-20 lg:py-28"
      >
        <div className="container">
          <SectionTitle
            title="Key Features"
            paragraph="Whether you are a seasoned freelancer or just getting started–Scavenger will change the game."
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))} 
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mt-24">
      <div className="w-full flex items-center justify-center">
        <button onClick={() => setSignup(true)} className="rounded-md border-2 border-white bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/30 dark:bg-black dark:text-white dark:hover:bg-white/30 sm:text-xl md:text-xl lg:text-xl xl:text-2xl shadow-lg flex items-center gap-3">Start Your Free Trial Today<img className="w-4" src='/clicktrial.svg' alt="start trial"/></button>
        </div>
        <p className="text-pblines mt-2 text-sm">No Contracts • Cancel Anytime</p>
      </div>

      </section>
    </>
  );
};

export default Features;
