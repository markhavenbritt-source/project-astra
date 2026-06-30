// Cloudflare Pages Function — POST /api/stripe-webhook
// Stripe calls this after a payment. We (1) verify it's genuinely from Stripe,
// then (2) on a completed checkout, create/find the buyer's account by the
// email they used and (3) write the ownership row. This — not the success
// page — is what actually grants "own forever" access.

import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export async function onRequestPost(context: any): Promise<Response> {
  const { request, env } = context;

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    httpClient: Stripe.createFetchHttpClient(),
  });

  const sig = request.headers.get("stripe-signature") || "";
  const body = await request.text();

  // 1. Verify the signature (uses Workers-compatible async crypto).
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      sig,
      env.STRIPE_WEBHOOK_SECRET,
      undefined,
      Stripe.createSubtleCryptoProvider()
    );
  } catch (err: any) {
    return new Response(`Webhook signature check failed: ${err?.message}`, {
      status: 400,
    });
  }

  // 2. Only act on a completed checkout.
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email ?? undefined;
    const productId = session.metadata?.product_id;
    const sessionId = session.id;

    if (email && productId) {
      const supabase = createClient(
        env.VITE_SUPABASE_URL,
        env.SUPABASE_SERVICE_ROLE_KEY
      );

      // Make sure a user exists for this email, and get their id.
      let userId: string | undefined;
      const { data: created } = await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
      });
      if (created?.user) {
        userId = created.user.id;
      } else {
        // User already exists — find them. (listUsers returns the first page;
        // fine for launch scale. Revisit if you grow past a few hundred users.)
        const { data: list } = await supabase.auth.admin.listUsers();
        userId = list?.users.find(
          (u) => u.email?.toLowerCase() === email.toLowerCase()
        )?.id;
      }

      // 3. Grant ownership. upsert => safe if Stripe retries the webhook.
      if (userId) {
        await supabase.from("entitlements").upsert(
          {
            user_id: userId,
            product_id: productId,
            stripe_session_id: sessionId,
          },
          { onConflict: "user_id,product_id" }
        );
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
