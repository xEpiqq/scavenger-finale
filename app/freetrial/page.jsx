'use client'
import React from 'react'
import '../../styles/index.css'
import { useEffect } from 'react'
import { app, db } from "../../components/initializeFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

const auth = getAuth(app);

const FreeTrial = () => {
  const [user, loading, user_error] = useAuthState(auth);
  const [userDataRaw, loading2, error2] = useDocument(doc(db, `users/${user?.uid}`));
  const userData = userDataRaw?.data();
  const user_id = user?.uid;

  useEffect(() => {
    if (!userDataRaw) return;
    const userData = userDataRaw?.data();
    if (!userData?.stripe_customer_id) return;
    if (userData.stripe_customer_id === "none") return;
    if (userData?.subscription_status !== "none") return;
    console.log(userData.stripe_customer_id)
    stripeCheckoutTrial();
  }, [userDataRaw]);

  const reloadUser = () => {
    const userRef = doc(db, `users/${user?.uid}`);
    const userSnap = getDoc(userRef);
    if (!userSnap) queueReload();
    if (userSnap) {
      let shouldReload = false;
      if (userSnap.data()?.stripe_customer_id === "none") shouldReload = true;
      if (userSnap.data()?.subscription_status !== "none") shouldReload = true;
      if (shouldReload) {
        queueReload();
        return;
      }
      stripeCheckoutTrial();
    }
  }

  const queueReload = () => {
    setTimeout(() => {
      reloadUser();
    }, 500);
  }

  if (error2) {
    queueReload();
  }

  async function stripeCheckoutTrial() {
    const response = await fetch ("/api/stripecheckout_trial", {
      method: "POST",
      body: JSON.stringify({
        user_id: user_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    const url = json.url;    
    window.location.href = url;    
  }

  return (
    <div className="w-full h-screen bg-pbblack font-bold items-center justify-center flex">

      <div className="flex flex-col h-[600px] -mt-32 items-center px-16 py-10">
        <h1 className="text-white text-[30px] xs:text-[35px] font-black text-center spacing sm:text-[40px]">Preparing Your 14-Day Free Trial Now...</h1>
        <h2 className='text-white text-center mt-1'>No risk, no contracts, and no long-term commitment. <span className='text-primary'>Cancel anytime</span>, hassle-free.</h2>
        
        <div className="mt-10 inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          </span>
        </div>

      </div>

    </div>
  )
}

export default FreeTrial