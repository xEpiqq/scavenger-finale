import Stripe from "stripe";

///////////////////////////STRIPE TEST MODE/////////////////////////////
const stripe_secret_test_key = process.env.STRIPE_SECRET_TEST_KEY; // test mode
const stripe = Stripe(stripe_secret_test_key) // test mode
////////////////////////////////////////////////////////////////////////

export async function POST(request) {
  const body = await request.json();
  const { subscriptionid } = body;

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionid);
    const nextBillingCycle = new Date(subscription.current_period_end * 1000);

    return new Response(JSON.stringify({ nextBillingCycle }));

  } catch (error) {
    console.error("Error retrieving subscription:", error);
    return new Response( JSON.stringify({ error: "Something happened, billing cycle not found" }));
}
}