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
import { useDocument } from "react-firebase-hooks/firestore";
import { useEffect } from "react";
import dayjs from "dayjs";
const auth = getAuth(app);

function Layout({ children }) {
  const [user, loading, user_error] = useAuthState(auth);
  const [userDataRaw, loading2, error2] = useDocument(doc(db, `users/${user?.uid}`));
  const userData = userDataRaw?.data();
  const userCreated = userData?.created
  const userCreatedDate = userCreated ? userCreated.toDate() : null;
  const userCreatedFormatted = userCreatedDate ? dayjs(userCreatedDate).format("YYYY-MM-DD") : null;
  const today = dayjs().format("YYYY-MM-DD");
  const daysSinceCreated = dayjs(today).diff(userCreatedFormatted, "day");
  
  const user_id = user?.uid; 

  async function stripeSubVerification() {
    const response = await fetch ("/api/stripe_sub_verification", {
      method: "POST",
      body: JSON.stringify({
        uid: user_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
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


  async function stripeCheckoutPremium() {
    const response = await fetch ("/api/stripecheckout", {
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

  useEffect(() => {
    // stripeSubVerification(); FOR NOW NOT INCLUDED JUST IN CASE IT SLOWS THINGS DOWN
    // IDEALLY WEBHOOKS WILL JUST WORK 100% WITHOUT FAIL

    if (userData?.subscription_status === "none") {
      stripeCheckoutTrial();
    }
    if (userData?.subscription_status === "canceled") {
      stripeCheckoutPremium();
    }
  }, [userData?.subscription_status]);


  if (userData?.subscription_status === "active" || userData?.subscritrialingption_status === "") {
    return (
      <body className="w-full h-full flex min-h-screen bg-pbsecondbg ">
      <div className="flex float-left flex-col w-full text-black bg-pbsecondbg sm:flex-row">
        <Navbar />
        <section className="w-full h-full inline-block overflow-x-clip bg-pbsecondbg">{children}</section>
      </div>
      </body>
    );
    }
}

export default Layout;
