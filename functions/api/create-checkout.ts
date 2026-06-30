// Cloudflare Pages Function — POST /api/create-checkout
// Creates a Stripe Checkout Session (one-time payment, GUEST checkout — no
// sign-in needed to buy) and returns the URL to send the buyer to.
// Stripe collects their email on the checkout page; the webhook uses it to
// grant ownership afterward.

import Stripe from "stripe";

// Map our internal product ids -> the Stripe PRICE id.
// NOTE: this is the TEST (sandbox) price. When you flip to real money,
// replace it with the LIVE price id from your live Stripe account.
const PRICE_BY_PRODUCT: Record<string, string> = {
  binary_issue_1: "price_1TnlWO8dCFXWFx0Gir5hpSEB",
};

export async function onRequestPost(context: any): Promise<Response> {
  const { request, env } = context;

  try {
    const { productId } = await request.json();
    const price = PRICE_BY_PRODUCT[productId];
    if (!price) return json({ error: "Unknown product" }, 400);

    const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      httpClient: Stripe.createFetchHttpClient(),
    });

    const origin = new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price, quantity: 1 }],
      // After paying, land on our "you own it" page (with the session id so we
      // can wait for ownership to be recorded). If they cancel, back to the title.
      success_url: `${origin}/owned?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/title/binary-01`,
      // The webhook reads this to know what was bought.
      metadata: { product_id: productId },
    });

    return json({ url: session.url });
  } catch (err: any) {
    return json({ error: err?.message ?? "Checkout failed" }, 500);
  }
}

function json(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
