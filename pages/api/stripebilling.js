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
          const session = await stripe.billingPortal.sessions.create({
            customer: firestore_user.stripe_customer_id,
            return_url: `${req.headers.origin}/sheets`,
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