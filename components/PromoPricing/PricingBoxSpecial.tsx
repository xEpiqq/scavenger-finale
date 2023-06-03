'use client'
import React from "react";
import Link from "next/link";
import SignupModal from '../Signupmodal/signupmodal'
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { loadStripe } from "@stripe/stripe-js";

///////////////////////STRIPE LIVE MODE/////////////////////////////
const stripe_public_key = "pk_live_51Mn4sZHpzbXtemiLt1PgKGM0Eo9yKpKWABzs3WeLN24ayguAeJPJ6CGKaIcSOSNjtkzFvfDJzhPRSyRcchX1QQ3r007EVzNPJZ";
const stripePromise = loadStripe(stripe_public_key);

// /////////////////////////STRIPE TEST MODE/////////////////////////////
// const stripe_public_key = "pk_test_51Mn4sZHpzbXtemiL0XN5qLTlaBxkoriYCe4gwg8Vq7TQxYs2CLpIC5HZahV7Xyf0EfKlq7JhzcG6GP2TTwjbsi8t00nALOso66" // test mode
// const stripePromise = loadStripe(stripe_public_key) // test mode


const PricingBoxSpecial = (props: {
  price: string;
  duration: string;
  packageName: string;
  subtitle: string;
  active: boolean;
  children: React.ReactNode;
}) => {
  const { price, duration, packageName, subtitle, children, active } = props;
  const [signup, setSignup] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(false);
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const uid = user?.uid;

  React.useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);


  return (
    <div className={`w-full ${!active ? "opacity-25" : "opacity-100"}`}>
        {signup && (
          <SignupModal setSignup={setSignup}/>
        )}
      <div
        className="wow fadeInUp relative z-10 rounded-md bg-primary/[.03] px-8 py-10 shadow-signUp"
        data-wow-delay=".1s"
      >
        <div className="flex items-center justify-between">
          <h3 className="price mb-2 text-3xl font-bold text-white">
            $<span className="amount">{price} / <span className="text-gray-3">{duration}</span> <p className='text-base line-through text-pbgreytext font-light' style={{textDecorationColor: "#E83826"}}>Normally $99</p></span>
          </h3>
          <h4 className="mb-2 text-xl font-bold">
            {packageName}
          </h4>
        </div>
        <p className="mb-7 text-base text-body-color">{subtitle}</p>
        <div className="mb-8 border-b border-body-color border-opacity-10 pb-8">
          {active ? (
            <form method="POST" action="/api/stripecheckout" onClick={() => {setSessionLoading(true)}}>

            <input type="hidden" name="user_id" value={uid} />      
            <section>
              <button type="submit" role="link" className="flex w-full items-center justify-center rounded-md bg-primary p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                Lock in price for life

                {sessionLoading && (
                <div className="flex justify-center items-center ml-5">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="#fff" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                  </div>
                ) 
              }


              </button>
            </section>
            </form>
            ) : (
            <form method="POST" action="/api/stripecheckout">
            <input type="hidden" name="user_id" value={uid} />      
            <section>
              <button type="submit" role="link" className="cursor-default flex w-full items-center justify-center rounded-md bg-primary p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                Lock in price for life
              </button>
            </section>
            </form>
            )}
          

        </div>
        <div>{children}</div>
        <div className="absolute bottom-0 right-0 z-[-1]">
          <svg
            width="179"
            height="158"
            viewBox="0 0 179 158"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M75.0002 63.256C115.229 82.3657 136.011 137.496 141.374 162.673C150.063 203.47 207.217 197.755 202.419 167.738C195.393 123.781 137.273 90.3579 75.0002 63.256Z"
              fill="url(#paint0_linear_70:153)"
            />
            <path
              opacity="0.3"
              d="M178.255 0.150879C129.388 56.5969 134.648 155.224 143.387 197.482C157.547 265.958 65.9705 295.709 53.1024 246.401C34.2588 174.197 100.939 83.7223 178.255 0.150879Z"
              fill="url(#paint1_linear_70:153)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_70:153"
                x1="69.6694"
                y1="29.9033"
                x2="196.108"
                y2="83.2919"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_70:153"
                x1="165.348"
                y1="-75.4466"
                x2="-3.75136"
                y2="103.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PricingBoxSpecial;
