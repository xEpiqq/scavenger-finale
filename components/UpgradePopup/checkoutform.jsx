import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements, createPaymentMethod, confirmCardPayment } from "@stripe/react-stripe-js";
import {CardElement, CardCvcElement, CardNumberElement, CardExpiryElement, getElement} from '@stripe/react-stripe-js';
import '../../styles/index.css'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
        window.location.reload(); // for some reason this works not sure why?
      }
      // props.closePopup();
    } catch (error) {
      setMessage(error.message);
    }
  
    setIsLoading(false);
  }

  return (
    <>
    <div className="w-full h-full absolute z-10 bg-black opacity-20"/>
    <div className="flex bg-white w-full max-w-120 h-auto fixed z-10 flex-col text-black rounded-md shadow-xl -mt-36">
    <form onSubmit={handleSubmit}>

      <div className="h-32 w-full flex rounded-tl-md rounded-tr-md border-b-2 border-b-paymentborder bg-white p-8">
            <h1 className="text-3xl font-bold">Start free 14 day trial</h1>
            <img src="/stripelogo.svg" className="w-16 absolute top-6 right-6" draggable={false}/>
        </div>
        <div className="bg-paymentmid w-full h-80 flex flex-col p-8 border-b-paymentborder border-b-2">
          <h2>
          Full free trial access, cancel anytime. We will remind you 3 days before your trial ends.

          Then $49 / month
          </h2>
          
          <h3 className="text-paymenttext font-medium text-sm opacity-50 mt-5">Card Number</h3>
          <div className="bg-white text-paymenttext border-paymentboxborder border rounded-md flex flex-row mt-2 p-3 w-full">
          <Image src='/cardicon.png' alt="Image of credit card" width={20} height={15} draggable={false} className="w-8 opacity-70 pointer-events-none"/>
          <CardNumberElement className='ml-4 w-full' />
          </div>

          <div className="flex flex-row gap-4">
              <div className="w-full">
              <h3 className="text-paymenttext font-medium text-sm opacity-50 mt-5">Expires</h3>
              <div className="bg-white text-paymenttext border-paymentboxborder border rounded-md flex flex-row mt-2 p-3 w-50">
              <CardExpiryElement className='ml-4 w-full' />
              </div>
              </div>
              <div className="w-full">
              <h3 className="text-paymenttext font-medium text-sm opacity-50 mt-5">CVC</h3>
              <div className="bg-white text-paymenttext border-paymentboxborder border rounded-md flex flex-row mt-2 p-3 w-full">
              <CardCvcElement className='ml-4 w-full'/>
              </div>
              </div>
          </div>
          {message && <div className="">{message}</div>}
        </div>


        <div className="bg-transparent w-full h-22 flex flex-row items-center p-4 justify-between">
        {/* <button onClick={props.closePopup} className="border-paymentboxborder border rounded-md w-30 px-4 h-11 text-paymenttext font-semibold text-sm opacity-40 cursor-default" >Cancel</button> */}
        <div className="w-30" />
        <button disabled={isLoading || !stripe || !elements} id="submit" className="bg-black rounded-md w-30 px-4 h-11 font-semibold text-sm text-white hover:bg-white hover:border hover:border-black hover:text-black transition duration-150" > Start Free Trial </button>
        </div>
        </form>

    </div>
    </>
  );
  }

export default CheckoutForm;