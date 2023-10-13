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
    console.log(affiliate_id)

    return new Response(JSON.stringify({ "YEAH": "DONE" }));
    


    let docRef
    try {
        docRef = doc(db, "users", user_id);
    } catch (error) {
        console.log("No such document!");
        return new Response(JSON.stringify({ "error": "failed" }));
    }

    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();
    let account, accountLink;

    
    if (docData.affiliate_id === undefined) {
        account = await stripe.accounts.create({
            type: 'express',
        });
        console.log(`New Express Account Created: ${account.id}`)
        await updateDoc(doc(db, "users", user_id), {
            affiliate_id: account.id,
        });
    }

    if (docData.affiliate_onboarded === undefined) {
        accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: `${req.headers.origin}/sheets`,
            return_url: `${req.headers.origin}/affiliate`,
            type: 'account_onboarding',
        });
        console.log(`Onboarding link: ${accountLink.url}`)
        // return new Response(JSON.stringify({ "url": accountLink.url }));
    return new Response(JSON.stringify({ "url": "https://google.com" }));


    }

    return new Response(JSON.stringify({ "url": "https://google.com" }));
}
