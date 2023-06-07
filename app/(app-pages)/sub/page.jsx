"use client";
import react from "react";
import PageName from "../components/PageName";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { app, db } from "../../../components/initializeFirebase";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { Tooltip } from "react-tooltip";
import moment from "moment";
import "react-tooltip/dist/react-tooltip.css";
import Stripe from "stripe";
import Link from "next/link";
import dayjs from "dayjs";

///////////////////////////STRIPE TEST MODE/////////////////////////////
const stripe_secret_test_key = process.env.STRIPE_SECRET_TEST_KEY; // test mode
const stripe = Stripe(stripe_secret_test_key); // test mode
////////////////////////////////////////////////////////////////////////

const auth = getAuth();

export default function Settings() {
  const [user, loading, user_error] = useAuthState(auth);
  const [userDataRaw, loading2, error2] = useDocument(
    doc(db, `users/${user?.uid}`)
  );
  const userData = userDataRaw?.data();
  const [cancellationError, setCancellationError] = useState("");
  const [modal, setModal] = useState(false);
  const [nextBillingCycle, setNextBillingCycle] = useState("");
  const subscriptionid = userData?.subscriptionid;
  const trialEndDate = moment(userData?.trial_end?.toDate());

  useEffect(() => {
    getNextBillingCycle().then((formattedDate) => {
      setNextBillingCycle(formattedDate);
    });
  }, []);

  async function cancelStripeSubscription() {
    console.log(`subscription id: ${subscriptionid}`);
    try {
      const response = await fetch("/api/cancelsub", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriptionid: subscriptionid,
        }),
      });
      const cancelSubscriptionResponse = await response.json();
      console.log(cancelSubscriptionResponse);
      console.log("subscription cancelled");
    } catch (error) {
      console.log("subscription not cancelled");
      setCancellationError(
        "Something went wrong. Try again or contact support."
      );
    }
    setModal(false);
  }

  async function getNextBillingCycle() {
    const response = await fetch("/api/nextbillingcycle", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscriptionid: subscriptionid,
      }),
    });

    const nextBillingCycleResponse = await response.json();
    const formattedDate = dayjs(
      nextBillingCycleResponse.nextBillingCycle
    ).format("MMMM D, YYYY h:mm A");
    console.log(formattedDate);
    return formattedDate;
  }

  return (
    <>
      <div className="px-6 min-h-screen">
        <PageName name="Manage Subscription" />
        <div className="my-6 flex flex-col">
          <div className="flex items-center justify-center gap-6">
            <img src={userData?.photo} className="h-14 w-14 rounded-full" />
            <h1 className="text-lg font-bold">{userData?.name}</h1>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-6">
            <h1>Manage Your Subscription</h1>
            {userData?.subscription_status === "trialing" && (
              <div className="flex flex-col items-center justify-center">
                <h1>You are currently on a free trial.</h1>
                <h1>
                  Your trial will end{" "}
                  <span className="font-bold"> {trialEndDate} </span>
                </h1>
              </div>
            )}

            {userData?.subscription_status === "active" ? (
              <div className="flex flex-col items-center justify-center">
                <h1>Your subscription is Premium $49 / mo</h1>
                <h1>
                  The next billing cycle begins on{" "}
                  <span className="font-bold">{nextBillingCycle}</span>
                </h1>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <h1>
                  You are not subscribed to Premium. You are on the free plan.
                </h1>
                <h1>Click <Link  href="/pricing"><span className="text-bluepill hover:text-gray-1">Here</span></Link> to view other plan options</h1>
                
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            setModal(true);
          }}
          className="absolute bottom-0 right-0 z-50 m-8 h-12 w-48 rounded-md bg-pbblack font-semibold text-white shadow-md transition duration-150 hover:bg-gray-1"
        >
          Cancel Subscription
        </button>
        {cancellationError && <div>{cancellationError}</div>}

        {modal && (
          <>
            <div
              class="z-9 fixed inset-0 bg-black bg-opacity-30"
              onClick={() => {
                setModal(false);
              }}
            />
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="bg-gray-500 absolute inset-0 opacity-75"></div>
                </div>
                <span
                  className="hidden sm:inline-block sm:align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <div
                  className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <div className="mt-2">
                          <p className="mt-3 text-sm text-pbblack">
                            You will{" "}
                            <span className="font-bold">
                              lose access to all features,
                            </span>{" "}
                            effective immediately
                          </p>

                          <p className="mt-3 text-sm text-pbblack">
                            Selling can be hard. I want you to succeed. Here's
                            my personal email for free coaching:{" "}
                            <span className="font-bold">
                              jaydencrowther@gmail.com
                            </span>
                          </p>

                          <div className="mt-8 flex w-full justify-between">
                            <button
                              className=" flex h-10 w-48 items-center justify-center rounded-md bg-redpill
                                text-xs font-semibold text-white shadow-md transition duration-150 hover:bg-gray-1"
                              onClick={() => {
                                setModal(false);
                              }}
                            >
                              Keep finding clients
                            </button>

                            <button
                              onClick={cancelStripeSubscription}
                              className="flex h-10 w-48 items-center justify-center rounded-md 
                                bg-bluepill text-xs font-semibold text-white shadow-md transition duration-150 hover:bg-gray-1"
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content="Don't give up! Email me!! Lets score you 1 client before you cancel."
                            >
                              Cancel Subscription
                            </button>
                            <Tooltip id="my-tooltip" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
