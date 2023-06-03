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
  console.log(firestore_user)

  if (req.method === 'POST') {
    try {
        // Update the customer object with address information
        const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: process.env.BASIC_PRICE_ID,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        customer: firestore_user.stripe_customer_id,
        // automatic_tax: {enabled: true},
        // customer_update: {
        //   address: 'auto',
        // },
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}