"use client";
import react from "react";
import PageName from "../components/PageName";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { app, db } from "../../../components/initializeFirebase";
import { doc} from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { Tooltip } from 'react-tooltip'
import moment from "moment";
import 'react-tooltip/dist/react-tooltip.css'
import Stripe from "stripe";
import dayjs from 'dayjs';


///////////////////////////STRIPE TEST MODE/////////////////////////////
const stripe_secret_test_key = process.env.STRIPE_SECRET_TEST_KEY; // test mode
const stripe = Stripe(stripe_secret_test_key) // test mode
////////////////////////////////////////////////////////////////////////

const auth = getAuth();


export default function Settings() {

    const [user, loading, user_error] = useAuthState(auth);
    const [userDataRaw, loading2, error2] = useDocument(doc(db, `users/${user?.uid}`));
    const userData = userDataRaw?.data()
    const [cancellationError, setCancellationError] = useState("");
    const [modal, setModal] = useState(false);
    const [nextBillingCycle, setNextBillingCycle] = useState("")
    const subscriptionid = userData?.subscriptionid
    const trialEndDate = moment(userData?.trial_end?.toDate()).fromNow();

    useEffect(() => {
        getNextBillingCycle().then((formattedDate) => {
            setNextBillingCycle(formattedDate)
        })
    }, [])

    async function cancelStripeSubscription() {
        console.log(`subscription id: ${subscriptionid}`)
        try {
            const response = await fetch('/api/cancelsub', {
                method: 'post',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                subscriptionid: subscriptionid,
                }),
            });
                const cancelSubscriptionResponse = await response.json();
                console.log(cancelSubscriptionResponse)
                console.log("subscription cancelled")
            } catch (error) {
                console.log("subscription not cancelled")
                setCancellationError("Something went wrong. Try again or contact support.")
            }
        setModal(false)
    }


    async function getNextBillingCycle() {
        const response = await fetch('/api/nextbillingcycle', {
            method: 'post',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            subscriptionid: subscriptionid,
            }),
        });

        const nextBillingCycleResponse = await response.json();
        const formattedDate = dayjs(nextBillingCycleResponse.nextBillingCycle).format('MMMM D, YYYY h:mm A');
        console.log(formattedDate)
        return formattedDate
    }
   
  return (
    <>
    <div className='px-6'>
      <PageName name="Manage Subscription" />
        <div className='flex flex-col my-6'>
        <div className="flex gap-6 justify-center items-center">
            <img src={userData?.photo} className="w-14 h-14 rounded-full"/>
            <h1 className="text-lg font-bold">{userData?.name}</h1>
        </div>
        <div className="flex flex-col gap-6 justify-center items-center mt-10">
        <h1>Manage Your Subscription</h1>
        {userData?.subscription_status === "trialing" && (
            <div className="flex items-center justify-center flex-col">
                <h1>You are currently on a free trial.</h1>
                <h1>Your trial will end <span className="font-bold"> {trialEndDate} </span></h1>
            </div>
        )}

        {userData?.subscription_status === "active" && (
            <div className="flex items-center justify-center flex-col">
                <h1>Your subscription is Premium $49 / mo</h1>
                <h1>The next billing cycle begins on <span className="font-bold">{nextBillingCycle}</span></h1>
            </div>
        )}
        </div>
        </div>
        <button onClick={() => {setModal(true)}} className="h-12 w-48 hover:bg-gray-1 transition duration-150 absolute z-50 bottom-0 right-0 m-8 bg-pbblack rounded-md shadow-md text-white font-semibold">Cancel Subscription</button>
        {cancellationError && ( <div>{cancellationError}</div> )}

        {modal && (
            <>
              <div class="fixed inset-0 z-9 bg-black bg-opacity-30" onClick={() => {setModal(false)}} />
                <div className="fixed z-10 inset-0 overflow-y-auto">
                  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div
                      className="fixed inset-0 transition-opacity"
                      aria-hidden="true"
                    >
                      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span

                      className="hidden sm:inline-block sm:align-middle sm:h-screen"
                      aria-hidden="true"
                    >
                      &#8203;
                    </span>
                    <div
                      className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="modal-headline"
                    >
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">

                            <div className="mt-2">
                              <p className="text-sm text-pbblack mt-3">You will <span className="font-bold">lose access to all features,</span> effective immediately</p>

                              <p className="text-sm text-pbblack mt-3">Selling can be hard. I want you to succeed. Here's my personal email for free coaching: <span className="font-bold">jaydencrowther@gmail.com</span></p>


                            <div className="w-full flex justify-between mt-8">
                                <button className=" text-xs h-10 w-48 hover:bg-gray-1 transition duration-150 bg-redpill
                                rounded-md shadow-md text-white font-semibold flex items-center justify-center" 
                                onClick={() => {setModal(false)}} >
                                Keep finding clients
                                </button>
                                
                                <button 
                                                          onClick={cancelStripeSubscription}
                                className="text-xs h-10 w-48 hover:bg-gray-1 transition duration-150 
                                bg-bluepill rounded-md shadow-md text-white font-semibold flex items-center justify-center" 
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
