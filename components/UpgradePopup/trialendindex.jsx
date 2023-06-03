"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

const TrialEndUpgradePopup = ({ closePopup }) => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const routerPushUpgrade = () => {
    router.push("/specialpromo");
  };


    return (
      <>
        <div className="absolute z-10 h-full w-full bg-black opacity-20" />
        <div className="fixed z-10 flex h-auto w-full max-w-120 flex-col rounded-md bg-white text-black shadow-xl -mt-36">
        <div className="h-32 w-full flex rounded-tl-md rounded-tr-md border-b-2 border-b-paymentborder bg-white p-8">
            <h1 className="text-3xl font-bold">Upgrade To Pro</h1>
        </div>
          <div className="flex h-80 w-full flex-col border-b-2 border-b-paymentborder bg-paymentmid p-8">
            <h2>
            Regain premium features with Scavenger Pro at
            <span className="font-bold ml-1">$49 / month </span> (Promotional Price)
            </h2>
            <button onClick={routerPushUpgrade} className="hover:bg-white hover:border-[1px] hover:border-black hover:text-pbblack mt-16 w-30 h-11 rounded-md bg-black px-4 text-sm font-semibold text-white transition duration-150">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </>
    );
  }


export default TrialEndUpgradePopup;
