import { buffer } from "micro";
import Stripe from "stripe";
import { collection, updateDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../../components/initializeFirebase";
const stripe_secret_key = process.env.STRIPE_REAL_SECRET_KEY; // production mode
const stripe = Stripe(stripe_secret_key); // production mode

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.STRIPE_WEBHOOK_ENDPOINT;

export default async function handler(req,res) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event, dataObject;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      dataObject = event.data.object;

      switch (event.type) {
        case "customer.subscription.created":
          subscriptionUpdated(dataObject);
        break;
        case "customer.subscription.updated":
          subscriptionUpdated(dataObject);
          break;
        case "customer.subscription.deleted":
          subscriptionUpdated(dataObject);
          break;
        default:
      }

      res.json({ received: true });
    } catch (err) {
      res.status(400).send(err);
      return;
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

async function subscriptionUpdated(dataObject) {
  const subscription_status = dataObject.status;
  const customer_id = dataObject.customer;
  const usersRef = collection(db, "users");
  const queryRef = query( usersRef, where("stripe_customer_id", "==", customer_id))
  const querySnap = await getDocs(queryRef);
  const docRef = querySnap.docs[0].ref;

  await updateDoc(docRef, {
    subscription_status: subscription_status,
    subscription_created: new Date(),
  });
}