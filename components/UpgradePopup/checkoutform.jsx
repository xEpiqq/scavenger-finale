import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  createPaymentMethod,
  confirmCardPayment,
} from "@stripe/react-stripe-js";
import {
  CardElement,
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
  getElement,
} from "@stripe/react-stripe-js";
import "../../styles/index.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = props.client_secret;
    if (!clientSecret) {
      return;
    }

    stripe.retrieveSetupIntent(clientSecret).then(({ setupIntent }) => {
      switch (setupIntent.status) {
        case "succeeded":
          setMessage("Setup succeeded!");
          break;
        case "processing":
          setMessage("Your setup is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your setup requires a payment method.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    try {
      const result = await stripe.confirmCardSetup(props.client_secret, {
        payment_method: { card: elements.getElement(CardNumberElement) },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else {
        setMessage("Setup succeeded!");
      }
      // props.closePopup();
    } catch (error) {
      setMessage(error.message);
    }
  
    await new Promise(r => setTimeout(r, 1000));
    window.location.reload(); // for some reason this works not sure why?
    setIsLoading(false);
  }

  return (
    <>
      <div className="absolute flex z-10 h-full w-full bg-black opacity-20" />
      <div className="fixed z-10 sm:-mt-36 m-0 flex h-screen w-screen max-w-120 flex-col rounded-md bg-white text-black shadow-xl sm:h-auto">
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 h-full">
          <div className="flex flex-0 flex-col sm:h-32 w-full rounded-tl-md rounded-tr-md border-b-2 border-b-paymentborder bg-white p-8">
            <h1 className="text-3xl font-bold">Start free 14 day trial</h1>
            <img
              src="/stripelogo.svg"
              className="sm:absolute sm:right-6 sm:top-6 w-16"
              draggable={false}
            />
          </div>
          <div className="flex flex-1 sm:h-80 w-full flex-col border-b-2 border-b-paymentborder bg-paymentmid p-8">
            <h2>
              Full free trial access, cancel anytime. We will remind you 3 days
              before your trial ends. Then $99 / month
            </h2>

            <h3 className="mt-5 text-sm font-medium text-paymenttext opacity-50">
              Card Number
            </h3>
            <div className="mt-2 flex w-full flex-row rounded-md border border-paymentboxborder bg-white p-3 text-paymenttext">
              <Image
                src="/cardicon.png"
                alt="Image of credit card"
                width={20}
                height={15}
                draggable={false}
                className="pointer-events-none w-8 opacity-70"
              />
              <CardNumberElement className="ml-4 w-full" />
            </div>

            <div className="flex flex-row gap-4">
              <div className="w-full">
                <h3 className="mt-5 text-sm font-medium text-paymenttext opacity-50">
                  Expires
                </h3>
                <div className="w-50 mt-2 flex flex-row rounded-md border border-paymentboxborder bg-white p-3 text-paymenttext">
                  <CardExpiryElement className="ml-4 w-full" />
                </div>
              </div>
              <div className="w-full">
                <h3 className="mt-5 text-sm font-medium text-paymenttext opacity-50">
                  CVC
                </h3>
                <div className="mt-2 flex w-full flex-row rounded-md border border-paymentboxborder bg-white p-3 text-paymenttext">
                  <CardCvcElement className="ml-4 w-full" />
                </div>
              </div>
            </div>
            {message && <div className="text-pblines text-sm mt-5">{message}</div>}
          </div>

          <div className="flex w-full flex-row items-center justify-between bg-transparent p-4 ">
            {/* <button onClick={props.closePopup} className="border-paymentboxborder border rounded-md w-30 px-4 h-11 text-paymenttext font-semibold text-sm opacity-40 cursor-default" >Cancel</button> */}
            <div className="w-30" />
            <button
              disabled={isLoading || !stripe || !elements}
              id="submit"
              className="w-30 h-11 rounded-md bg-black px-4 text-sm font-semibold text-white transition duration-150 hover:border hover:border-black hover:bg-white hover:text-black"
            >
              {" "}
              Start Free Trial{" "}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CheckoutForm;
