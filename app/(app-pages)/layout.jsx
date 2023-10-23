"use client";
import react from "react";
import Navbar from "./components/Navbar";
import "../../styles/index.css";
import TrialEndUpgradePopup from "../../components/UpgradePopup/trialendindex";
import Header from "./components/Header/index";
import { app, db } from "../../components/initializeFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";

import { useEffect } from "react";
import dayjs from "dayjs";
const auth = getAuth(app);

function Layout({ children }) {
  const [user, loading, user_error] = useAuthState(auth);

  async function stripeSubVerification() {
    const response = await fetch("/api/stripe_sub_verification", {
      method: "POST",
      body: JSON.stringify({
        uid: user.uid,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function stripeCheckoutTrial() {
    console.log("trialing");
    const response = await fetch("/api/stripecheckout_trial", {
      method: "POST",
      body: JSON.stringify({
        user_id: user.uid,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    const url = json.url;
    window.location.href = url;
  }

  async function stripeCheckoutPremium() {
    const response = await fetch("/api/stripecheckout", {
      method: "POST",
      body: JSON.stringify({
        user_id: user.uid,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    const url = json.url;
    window.location.href = url;
  }

  if (loading) return <div>loading...</div>;
  if (user_error) return <div>error: {user_error}</div>;
  if (!user) return <div>not logged in</div>;

  const checkUser = async () => {
    const userRef = doc(db, `users/${user?.uid}`);
    const userSnap = getDoc(userRef);
    if (!userSnap) queueReload();
    if (!user) return false;
    const userDoc = doc(db, `users/${user?.uid}`);
    if (!userDoc) return false;
    const userData = await getDoc(userDoc);
    if (!userData) return false;
    if (userData?.data().subscription_status === "none") {
      stripeCheckoutTrial();
      return false;
    }
    if (userData?.data().subscription_status === "canceled") {
      stripeCheckoutPremium();
      return false;
    }
    return true;
  };

  if (user) {
    const userActive = checkUser();
    
  }

  return (
    <div className="float-left flex w-full flex-col bg-pbsecondbg text-black sm:flex-row">
      <Navbar />
      <section className="inline-block h-full w-full overflow-x-clip bg-pbsecondbg">
        {children}
      </section>
    </div>
  );
}

export default Layout;
