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

        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 mt-36 mb-16" id="signupform" >
          <button
          onClick={() => {setSignup(true)}}
          className="rounded-md bg-primary py-3 px-4 font-semibold text-white duration-300 ease-in-out hover:bg-black/30 dark:bg-black border-white border-2 dark:text-white dark:hover:bg-white/30 
                  text-lg sm:text-2xl md:text-2xl lg:text-2xl">
                    Start Your Free Trial Today
          </button>
        </div> 

      </section>
    </>
  );
};

export default Features;
