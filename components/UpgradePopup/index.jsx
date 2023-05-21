"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkoutform";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const stripe_public_key = "pk_live_51Mn4sZHpzbXtemiLt1PgKGM0Eo9yKpKWABzs3WeLN24ayguAeJPJ6CGKaIcSOSNjtkzFvfDJzhPRSyRcchX1QQ3r007EVzNPJZ";
const stripePromise = loadStripe(stripe_public_key);

// ///////////////////////////STRIPE TEST MODE/////////////////////////////
// const stripe_public_key = "pk_test_51Mn4sZHpzbXtemiL0XN5qLTlaBxkoriYCe4gwg8Vq7TQxYs2CLpIC5HZahV7Xyf0EfKlq7JhzcG6GP2TTwjbsi8t00nALOso66" // test mode
// const stripePromise = loadStripe(stripe_public_key) // test mode
// ////////////////////////////////////////////////////////////////////////

const UpgradePopup = ({ closePopup }) => {
  const auth = getAuth();
  const [clientSecret, setClientSecret] = useState(undefined);
  const [user, loading] = useAuthState(auth);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    async function setupPayment() {
      setPaymentLoading(true);

      if (!user) {
        return;
      }

      const response = await fetch("/api/stripesetupintent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.uid,
        }),
      });

      // get the client secret from the response is json?
      // const client_secret = response.data.clientSecret;

      const data = await response.json();
      const client_secret = data.clientSecret;
      setClientSecret(client_secret);
      console.log("client secret: " + client_secret);
      setPaymentLoading(false);
    }
    setupPayment();
  }, [user]);

  if (paymentLoading) {
    return (
      <>
        <div className="absolute z-10 h-full w-full bg-black opacity-20" />
        <div className="fixed z-10 flex h-auto w-full max-w-120 flex-col rounded-md bg-white text-black shadow-xl -mt-36">
        <div className="h-32 w-full flex rounded-tl-md rounded-tr-md border-b-2 border-b-paymentborder bg-white p-8">
            <h1 className="text-3xl font-bold">Start free 14 day trial</h1>
            <img src="/stripelogo.svg" className="w-16 absolute top-6 right-6" draggable={false}/>
        </div>
          <div className="flex h-80 w-full flex-col border-b-2 border-b-paymentborder bg-paymentmid p-8">
            <h2>
            Full free trial access, cancel anytime. We will remind you 3 days before your trial ends.

            Then $49 / month
            </h2>

            <h3 className="mt-5 text-sm font-medium text-paymenttext opacity-50">
              Card Number
            </h3>
            <Skeleton className="mt-2 flex w-full flex-row rounded-md border border-paymentboxborder bg-white p-3 text-paymenttext" />
              {/* <Image
                src="/cardicon.png"
                alt="Image of credit card"
                width={20}
                height={15}
                draggable={false}
                className="pointer-events-none w-8 opacity-70"
              />
              <Skeleton className="w-full" /> */}
            {/* </div> */}

            <div className="flex flex-row gap-4">
              <div className="w-full">
                <h3 className="mt-5 text-sm font-medium text-paymenttext opacity-50">
                  Expires
                </h3>
                <Skeleton className="w-50 mt-2 flex flex-row rounded-md border border-paymentboxborder bg-white p-3 text-paymenttext" />
              </div>
              <div className="w-full">
                <h3 className="mt-5 text-sm font-medium text-paymenttext opacity-50">
                  CVC
                </h3>
                <Skeleton className="mt-2 flex w-full flex-row rounded-md border border-paymentboxborder bg-white p-3 text-paymenttext" />
              </div>
            </div>
            {/* {message && <div className="">{message}</div>} */}
          </div>

          <div className="h-22 flex w-full flex-row items-center justify-between bg-transparent p-4">
            <button className="border-paymentboxborder border rounded-md w-30 px-4 h-11 text-paymenttext font-semibold text-sm opacity-40 cursor-default">
              Cancel
            </button>
            <button className="w-30 h-11 rounded-md bg-black px-4 text-sm font-semibold dark:text-black text-black" style={{color:"white"}}>
              {" "}
              Start Free Trial{" "}
            </button>
          </div>
        </div>
      </>
    );
  }

  if (true) {
    const options = {
      clientSecret: clientSecret,
      appearance: { theme: "stripe" },
    };
    return (
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm client_secret={clientSecret} closePopup={closePopup} />
      </Elements>
    );
  }
};

export default UpgradePopup;
