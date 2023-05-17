import Stripe from "stripe";
import { getFirestore, collection, addDoc, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { app, db } from '../../../components/initializeFirebase'

// /////////////////////////STRIPE LIVE MODE/////////////////////////////
// const stripe_secret_key = process.env.STRIPE_REAL_SECRET_KEY; // production mode
// const stripe = Stripe(stripe_secret_key); // production mode
// const basic_price_id = process.env.BASIC_PRICE_ID;
// //////////////////////////////////////////////////////////////////////

///////////////////////////STRIPE TEST MODE/////////////////////////////
const stripe_secret_test_key = process.env.STRIPE_SECRET_TEST_KEY; // test mode
const stripe = Stripe(stripe_secret_test_key) // test mode
const basic_price_id = "price_1N5XrWHpzbXtemiLOvrBL1lK" // scavenger premium price id (49 /mo )
////////////////////////////////////////////////////////////////////////

export async function POST(request) {

  let clientSecret;

  const body = await request.json();
  const { user_id } = body
  const userRef = doc(db, "users", user_id)
  const userDoc = await getDoc(userRef)
  const firestore_user = userDoc.data()

  try {

    const setupIntent = await stripe.setupIntents.create({
        customer: firestore_user.stripe_customer_id,
        payment_method_types: ['card'],
    });

    console.log("The setup intent object is")
    clientSecret = setupIntent.client_secret;
    

  } catch (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }

  return new Response(JSON.stringify({ clientSecret }));
}