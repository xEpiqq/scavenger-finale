import Stripe from "stripe";
const stripe_secret_key = process.env.STRIPE_REAL_SECRET_KEY; // production mode
const stripe = Stripe(stripe_secret_key); // production mode
import { getFirestore, collection, addDoc, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { app, db } from '../../components/initializeFirebase'

export default async function handler(req, res) {
  const user_id = req.body.user_id;
  console.log(user_id)
  const userRef = doc(db, "users", user_id)
  const userDoc = await getDoc(userRef)
  const firestore_user = userDoc.data()

  if (req.method === 'POST') {
    try {
        const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: process.env.TRIAL_PRICE_ID,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${req.headers.origin}/thankyou/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        customer: firestore_user.stripe_customer_id,
        // automatic_tax: {enabled: true},
        // customer_update: {
        //   address: 'auto',
        // },
        // 14 day trial
        subscription_data: {
          trial_period_days: 14,
        }, 

      });
      res.status(200).json({ url: session.url });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}