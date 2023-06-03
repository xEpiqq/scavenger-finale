import Stripe from "stripe";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { app, db } from '../../../components/initializeFirebase'

/////////////////////////STRIPE LIVE MODE/////////////////////////////
const stripe_secret_key = process.env.STRIPE_REAL_SECRET_KEY; // production mode
const stripe = Stripe(stripe_secret_key); // production mode
//////////////////////////////////////////////////////////////////////

export async function POST(request) {
    const body = await request.json();
    const { uid } = body;
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);
    const user = userDoc.data();
    const stripeCustomerId = user.stripe_customer_id;
    const subscriptions = await stripe.subscriptions.list({ customer: stripeCustomerId });

    const subscriptionStatus = [];

    for (let i = 0; i < subscriptions.data.length; i++) {
        subscriptionStatus.push(subscriptions.data[i].status);
    }

    if (subscriptionStatus.includes("cancelled")) {
        await updateDoc(userRef, {
            subscription_status: "cancelled"
        })
    }
    
    if (subscriptionStatus.includes("trialing")) {
        await updateDoc(userRef, {
            subscription_status: "trialing"
        })
    }

    if (subscriptionStatus.includes("active")) {
        await updateDoc(userRef, {
            subscription_status: "active"
        })
    }

    console.log(subscriptionStatus);

    return new Response(JSON.stringify({ "User Status Checked": "Successfully" }));
}
