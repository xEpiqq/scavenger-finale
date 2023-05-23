import { headers } from "next/headers";
import { collection, updateDoc, query, where, getDocs } from "firebase/firestore";
import { db } from '../../../components/initializeFirebase'
import Stripe from 'stripe';
import dayjs from 'dayjs';

/////////////////////////STRIPE LIVE MODE/////////////////////////////
const stripe_secret_key = process.env.STRIPE_REAL_SECRET_KEY; // production mode
const stripe = Stripe(stripe_secret_key) // production mode
const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT; // production mode
const basic_price_id = process.env.BASIC_PRICE_ID;
//////////////////////////////////////////////////////////////////////

export async function POST(req) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature");

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_ENDPOINT
        );
    } catch (error) {
        return new Response(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const dataObject = event.data.object;

    switch (event.type) {

        case 'customer.subscription.created':
            subscriptionCreated(dataObject)
            break
        case 'customer.subscription.updated':
            subscriptionUpdated(dataObject)
            break
        case 'customer.subscription.deleted':
            subscriptionDeleted(dataObject)
            break;
        case "setup_intent.succeeded":
            setupIntentSucceeded(dataObject)
            break;
        default:
        
    }

    return new Response(null, { status: 200 });
}
  
  
async function setupIntentSucceeded(dataObject) {
    console.log("Setup intent succeeded")

    const customer_id = dataObject.customer
    const paymentMethodId = dataObject.payment_method
  
    const currentDate = new Date();
    const trialEndTimestamp = dayjs(currentDate).add(14, 'day').unix();
  
    const subscription = await stripe.subscriptions.create({
      customer: customer_id,
      items: [{ price: basic_price_id }],
      default_payment_method: paymentMethodId,
      trial_end: trialEndTimestamp,
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });
  
    const usersRef = collection(db, "users");
    const queryRef = query(usersRef, where("stripe_customer_id", "==", customer_id));
    const querySnap = await getDocs(queryRef);
    const docRef = querySnap.docs[0].ref;
  
    await updateDoc(docRef, {
      productid: basic_price_id,
      subscriptionid: subscription.id,
      subscription_status: subscription.status,
      subscription_created: new Date(),
      trial_end: trialEndTimestamp
    });
  
}

async function subscriptionCreated(dataObject) {
    console.log('customer subscription created!!!')
  }

  async function subscriptionUpdated(dataObject) {
    console.log('customer subscription updated!!!')
    const product_id = dataObject.items.data[0].price.product
    const subscription_id = dataObject.id
    const subscription_status = dataObject.status
    const customer_id = dataObject.customer
  
    const usersRef = collection(db, "users");
    // Create a query to search for the document with the specified customer_id
    const queryRef = query(usersRef, where("stripe_customer_id", "==", customer_id));
    const querySnap = await getDocs(queryRef);
    // Check if the query snapshot has any documents
    const docRef = querySnap.docs[0].ref;
    // Update the fields of the document with the specified data
    await updateDoc(docRef, {
      productid: product_id,
      subscriptionid: subscription_id,
      subscription_status: subscription_status,
      subscription_created: new Date()
    });
}
  
async function subscriptionDeleted(dataObject) {
    console.log('customer subscription deleted!!!')
    const customer_id = dataObject.customer
    const usersRef = collection(db, "users");
    const queryRef = query(usersRef, where("stripe_customer_id", "==", customer_id));
    const querySnap = await getDocs(queryRef);
    const subscriptionid = querySnap.docs[0].data().subscriptionid;
    const docRef = querySnap.docs[0].ref;
  
    const subscription = await stripe.subscriptions.retrieve(subscriptionid);
    let subtype = 'premium';
  
    if (subscription.trial_end) {
      subtype = 'trial';
    }
  
    await updateDoc(docRef, {
      subscription_status: "cancelled",
      cancelled_on: new Date(),
      cancelled_subscription_type: subtype
    });
}