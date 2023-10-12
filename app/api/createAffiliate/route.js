import { app } from "../../../components/initializeFirebase";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import ListItem from "../../(app-pages)/sheets/(sheet)/ListItem.js";
import { collection, addDoc } from "firebase/firestore";
import Stripe from "stripe";
// import { getFirestore, collection, addDoc, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
const db = getFirestore(app);
const stripe_secret_key = process.env.STRIPE_REAL_SECRET_KEY; // production mode
const stripe = Stripe(stripe_secret_key); // production mode

export async function POST(request) {
    const body = await request.json();
    const stripe_customer_id = body.stripe_customer_id;
    console.log(stripe_customer_id)


    const account = await stripe.accounts.create({
        type: 'express',
    });
    console.log(account.id)

    // const accountLink = await stripe.accountLinks.create({
    // account: stripe_customer_id,
    // refresh_url: 'https://example.com/reauth',
    // return_url: 'https://example.com/return',
    // type: 'account_onboarding',
    // });

    // console.log(accountLink.url)    


//   await addDoc(collection(db, "ai-email-queue"), {
//     body,
//   });

    NextResponse.json({ body: { success: true } });
}
