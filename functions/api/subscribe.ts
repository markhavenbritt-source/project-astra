// Cloudflare Pages Function — handles POST /api/subscribe
// Receives an email from the newsletter form, forwards to Beehiiv API.
// Runs server-side on Cloudflare's edge — API key never exposed to browser.

interface Env {
  BEEHIIV_API_KEY: string;
  BEEHIIV_PUBLICATION_ID: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // Parse the incoming JSON body
  let email: string | undefined;
  try {
    const body = (await request.json()) as { email?: string };
    email = body.email;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Basic email validation
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  // Tolerate Publication IDs with or without the "pub_" prefix
  const publicationId = env.BEEHIIV_PUBLICATION_ID.startsWith("pub_")
    ? env.BEEHIIV_PUBLICATION_ID
    : `pub_${env.BEEHIIV_PUBLICATION_ID}`;

  // Call Beehiiv's subscribe endpoint
  const beehiivResponse = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.BEEHIIV_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: "project-astra",
        utm_medium: "website",
        utm_campaign: "newsletter_card",
      }),
    },
  );

  if (!beehiivResponse.ok) {
    const errText = await beehiivResponse.text();
    console.error("Beehiiv error:", beehiivResponse.status, errText);
    return Response.json(
      { error: "Subscription failed" },
      { status: 502 },
    );
  }

  return Response.json({ success: true });
};
