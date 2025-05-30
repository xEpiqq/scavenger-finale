import { app } from "../../../components/initializeFirebase";
import { getFirestore} from "firebase/firestore";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { doc, getDoc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
const db = getFirestore(app);


const stripe_secret_key = process.env.STRIPE_REAL_SECRET_KEY; // production mode
const stripe = Stripe(stripe_secret_key); // production mode

export async function POST(request) {

    const body = await request.json();

    const user_id = body.user_id;
    const stripe_customer_id = body.stripe_customer_id;
    const affiliate_id = body.affiliate_id;
    const affiliate_onboarded = body.affiliate_onboarded;

    if (affiliate_onboarded === true) {
        return new Response(JSON.stringify({ "url": "https://scavng.com/affiliate" }));
    } else {
        const stripeAccount = await stripe.accounts.retrieve(affiliate_id);
        const detailsSubmitted = stripeAccount.details_submitted 
        if (detailsSubmitted) {
            await updateDoc(doc(db, "users", user_id), {
                affiliate_onboarded: true,
        });
        return new Response(JSON.stringify({ "url": "https://scavng.com/affiliate" }));
        }
    }

    console.log(affiliate_id)
    console.log(stripe_customer_id)
    console.log(affiliate_onboarded)

    let account, accountLink;
    let accountId = affiliate_id;

    if (affiliate_id === "" || affiliate_id === undefined) {
        account = await stripe.accounts.create({
            type: 'express',
        });
        accountId = account.id;
        console.log(`New Express Account Created: ${account.id}`)
        await updateDoc(doc(db, "users", user_id), {
            affiliate_id: accountId,
        });
    }

    if (affiliate_onboarded === undefined) {
        accountLink = await stripe.accountLinks.create({
            account: accountId,
            refresh_url: `https://scavng.com/sheets`,
            return_url: `https://scavng.com/affiliate`,
            type: 'account_onboarding',
        });
        return new Response(JSON.stringify({ "url": accountLink.url }));
    }

    return new Response(JSON.stringify({ "url": "https://google.com" }));
}
