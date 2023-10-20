"use client";

import React from "react";
import SurveyRadialCard from "./SurveyRadialCard.jsx";
import SurveyRadialCardSm from "./SurveyRadialCardSm.jsx";
import "../../styles/index.css";

import { useState } from "react";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, db } from "../../components/initializeFirebase.jsx";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation.js";
import NoSSR from "../../components/NoSSR"

const auth = getAuth(app);

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Page() {

  const router = useRouter();

  const [user, loading, error] = useAuthState(auth);
  const [submitLoading, setSubmitLoading] = useState(false);

  const preferredMethodOptions = [
    {
      id: 1,
      title: "Phone",
      description: "Getting clients by cold calling",
      users: "",
    },
    {
      id: 2,
      title: "Social Media",
      description: "Getting clients through social media",
      users: "",
    },
    {
      id: 3,
      title: "Email",
      description: "Getting clients through cold email",
      users: "",
    },
  ];

  const clientsPerWeekOptions = [
    { id: 0, name: "1" },
    { id: 1, name: "2" },
    { id: 2, name: "3" },
    { id: 3, name: "4+" },
  ];

  const [preferredMethod, setPreferredMethod] = useState(
    preferredMethodOptions[0]
  );
  const [clientsPerWeek, setClientsPerWeek] = useState(
    clientsPerWeekOptions[0]
  );

  const onSubmit = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    setSubmitLoading(true);
    fetch("/api/signup-survey-submitted", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        preferedMethod: preferredMethod.title,
        clientsPerWeek: clientsPerWeek.name,
        user_id: user.uid,
      }),
    });
    stripeCheckoutTrial();
    queueReload();
  };

  const reloadUser = () => {
    const userRef = doc(db, `users/${user?.uid}`);
    const userSnap = getDoc(userRef);
    if (!userSnap) {
      queueReload();
      return;
    }
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
  };

  const queueReload = () => {
    setTimeout(() => {
      reloadUser();
    }, 500);
  };

  async function stripeCheckoutTrial() {
    const response = await fetch("/api/stripecheckout_trial", {
      method: "POST",
      body: JSON.stringify({
        user_id: user.uid,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return;
    }
    const json = await response.json();
    const url = json.url;
    window.location.href = url;
  }

  return (
    <div className="relative isolate flex min-h-screen w-full justify-center overflow-hidden bg-white p-20">
      <NoSSR>
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="flex max-w-7xl flex-col gap-8 pt-4 ">
          <hr className="w-full" />
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Lets get started! 🚀
          </h1>
          <SurveyRadialCard
            title="What is your preferred method of outreach?"
            value={preferredMethod}
            onChange={setPreferredMethod}
            options={preferredMethodOptions}
          />
          <SurveyRadialCardSm
            title="How many clients do you want to get per week?"
            value={clientsPerWeek}
            onChange={setClientsPerWeek}
            options={clientsPerWeekOptions}
          />
          <button
            type="button"
            onClick={onSubmit}
            className="max-w-xs rounded bg-indigo-600 px-2 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {submitLoading ? "Loading..." : "Continue ->"}
          </button>
        </div>
      </NoSSR>
    </div>
  );
}

export default Page;
